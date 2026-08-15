
"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";
import { BackToHomeLink } from "@/components/auth/BackToHomeLink";

function toErrorMessage(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return toErrorMessage(value[0]);
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj.longMessage === "string") return obj.longMessage;
    if (typeof obj.message === "string") return obj.message;
  }
  return "Something went wrong. Please try again.";
}

export default function ForgotPasswordPage() {
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();

  const [step, setStep] = useState<"request" | "reset" | "done">("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmitting = fetchStatus === "fetching";

  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const { error: createError } = await signIn.create({
        identifier: email,
      });
      if (createError) {
        setErrorMessage(toErrorMessage(createError));
        return;
      }

      const { error: sendCodeError } =
        await signIn.resetPasswordEmailCode.sendCode();
      if (sendCodeError) {
        setErrorMessage(toErrorMessage(sendCodeError));
        return;
      }

      setStep("reset");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "We couldn't send a reset code. Please check your email and try again."
      );
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const { error: verifyError } =
        await signIn.resetPasswordEmailCode.verifyCode({ code });
      if (verifyError) {
        setErrorMessage(toErrorMessage(verifyError));
        return;
      }

      const { error: submitError } =
        await signIn.resetPasswordEmailCode.submitPassword({
          password: newPassword,
        });
      if (submitError) {
        setErrorMessage(toErrorMessage(submitError));
        return;
      }

      setStep("done");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "That code didn't work, or your new password doesn't meet the requirements. Please try again."
      );
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AuthBrandPanel />

      <div className="flex flex-[2] items-start justify-center overflow-y-auto px-6 py-10 sm:items-center sm:py-6 lg:flex-[3]">
        <div className="w-full max-w-sm">
          <BackToHomeLink />

          {step === "request" && (
            <>
              <div className="mb-4">
                <h1 className="text-lg font-semibold text-gray-900">
                  Reset your password
                </h1>
                <p className="mt-1 text-xs text-gray-500">
                  Enter your email and we&apos;ll send you a reset code.
                </p>
              </div>

              {errorMessage && (
                <p className="mb-3 text-xs text-red-600">{errorMessage}</p>
              )}

              <form
                onSubmit={handleRequestCode}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="reset-email"
                    className="text-xs font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="h-9 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-9 rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send reset code"}
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-gray-500">
                Remembered your password?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-brand-500 hover:text-brand-600"
                >
                  Back to sign in
                </Link>
              </p>
            </>
          )}

          {step === "reset" && (
            <>
              <div className="mb-4">
                <h1 className="text-lg font-semibold text-gray-900">
                  Check your email
                </h1>
                <p className="mt-1 text-xs text-gray-500">
                  We sent a code to {email} — enter it below along with your
                  new password.
                </p>
              </div>

              {errorMessage && (
                <p className="mb-3 text-xs text-red-600">{errorMessage}</p>
              )}

              <form
                onSubmit={handleResetPassword}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="reset-code"
                    className="text-xs font-medium text-gray-700"
                  >
                    Reset code
                  </label>
                  <input
                    id="reset-code"
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    className="h-9 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="new-password"
                    className="text-xs font-medium text-gray-700"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="h-9 w-full rounded-lg border border-gray-300 px-3 pr-9 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-9 rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {isSubmitting ? "Resetting..." : "Reset password"}
                </button>
              </form>
            </>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
              <h1 className="text-lg font-semibold text-gray-900">
                Password reset
              </h1>
              <p className="text-sm text-gray-500">
                Your password has been updated. You can now sign in with
                your new password.
              </p>
              <button
                type="button"
                onClick={() => router.push("/sign-in")}
                className="mt-2 h-9 w-full rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Go to sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}