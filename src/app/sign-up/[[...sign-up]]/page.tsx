"use client";

import { useState, useEffect } from "react";
import { useSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
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

export default function SignUpPage() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  const [step, setStep] = useState<"details" | "verify">("details");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isUserLoaded && !isSignedIn) return;

    if (isUserLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isUserLoaded, isSignedIn, router]);

  const isSubmitting = fetchStatus === "fetching";

  const globalErrorMessage = toErrorMessage(submitError ?? errors?.global);
  const emailErrorMessage = toErrorMessage(errors?.fields?.emailAddress);
  const passwordErrorMessage = toErrorMessage(errors?.fields?.password);

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!agreed) return;

    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    try {
      const { error } = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (error) return;

      if (signUp.status === "complete") {
        await signUp.finalize({ navigate: () => router.push("/dashboard") });
        return;
      }

      await signUp.verifications.sendEmailCode();
      setStep("verify");
    } catch (err) {
      console.error(err);
      setSubmitError(
        "We couldn't create your account. Please check your details and try again."
      );
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    try {
      const { error } = await signUp.verifications.verifyEmailCode({ code });

      if (error) return;

      if (signUp.status === "complete") {
        await signUp.finalize({ navigate: () => router.push("/dashboard") });
      }
    } catch (err) {
      console.error(err);
      setSubmitError("That code didn't work. Please check it and try again.");
    }
  }

  async function handleGoogleSignUp() {
    setSubmitError(null);
    try {
      await signUp.sso({
        strategy: "oauth_google",
        redirectCallbackUrl: "/sign-up/sso-callback",
        redirectUrl: "/dashboard",
      });
    } catch (err) {
      console.error(err);
      setSubmitError("Google sign-up failed. Please try again.");
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AuthBrandPanel />

      <div className="flex flex-[2] items-center justify-center overflow-y-auto px-6 py-6 lg:flex-[3]">
        <div className="w-full max-w-sm">
          <BackToHomeLink />
          <div id="clerk-captcha" />
          {step === "details" ? (
            <>
              <div className="mb-4">
                <h1 className="text-lg font-semibold text-gray-900">
                  Create your account
                </h1>
                <p className="mt-1 text-xs text-gray-500">
                  Start your free trial
                </p>
              </div>

              {globalErrorMessage && (
                <p className="mb-3 text-xs text-red-600">
                  {globalErrorMessage}
                </p>
              )}

              <form
                onSubmit={handleCreateAccount}
                className="flex flex-col gap-3.5"
              >
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="fullName"
                    className="text-xs font-medium text-gray-700"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="h-9 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="signup-email"
                    className="text-xs font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="h-9 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                  {emailErrorMessage && (
                    <p className="text-xs text-red-600">
                      {emailErrorMessage}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="signup-password"
                    className="text-xs font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  {passwordErrorMessage && (
                    <p className="text-xs text-red-600">
                      {passwordErrorMessage}
                    </p>
                  )}
                </div>

                <label className="flex items-start gap-2 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-brand-500 hover:text-brand-600"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-brand-500 hover:text-brand-600"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 h-9 rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </form>

              <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
                <span className="h-px flex-1 bg-gray-200" />
                or continue with
                <span className="h-px flex-1 bg-gray-200" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <GoogleIcon />
                Sign up with Google
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-brand-500 hover:text-brand-600"
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="mb-4">
                <h1 className="text-lg font-semibold text-gray-900">
                  Verify your email
                </h1>
                <p className="mt-1 text-xs text-gray-500">
                  We sent a code to {email} — enter it below.
                </p>
              </div>

              {globalErrorMessage && (
                <p className="mb-3 text-xs text-red-600">
                  {globalErrorMessage}
                </p>
              )}

              <form onSubmit={handleVerify} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="code"
                    className="text-xs font-medium text-gray-700"
                  >
                    Verification code
                  </label>
                  <input
                    id="code"
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    className="h-9 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-9 rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}