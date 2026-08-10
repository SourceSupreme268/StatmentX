
"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// This replaces the ENTIRE root layout when the root layout itself throws —
// it cannot assume Tailwind, fonts, ClerkProvider, or any other app-level
// provider is working. Inline styles only, no external component imports.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "16px",
          textAlign: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: "14px", color: "#6B7280", maxWidth: "320px" }}>
          The application ran into an unexpected error. Try reloading the
          page.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "8px",
            borderRadius: "8px",
            backgroundColor: "#111827",
            color: "white",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}