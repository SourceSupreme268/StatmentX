"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs";

/**
 * Shared OAuth (Google) redirect callback handler.
 * Used by both /sign-in/sso-callback and /sign-up/sso-callback.
 * Core 3 removed <AuthenticateWithRedirectCallback />, so this is
 * the manual replacement — see Clerk's Core 3 migration guide.
 */
export default function SSOCallbackPage() {
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    (async () => {
      if (!clerk.loaded || hasRun.current) return;
      hasRun.current = true;

      const navigate = async ({
        decorateUrl,
      }: {
        session?: unknown;
        decorateUrl: (url: string) => string;
      }) => {
        const url = decorateUrl("/dashboard");
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      };

      if (signIn.status === "complete") {
        await signIn.finalize({ navigate });
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize({ navigate });
        return;
      }

      // Neither flow completed — send the user back to sign in.
      router.push("/sign-in");
    })();
  }, [clerk.loaded, signIn, signUp, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-gray-500">Completing sign in...</p>
    </div>
  );
}
