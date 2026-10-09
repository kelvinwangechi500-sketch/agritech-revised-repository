"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#fafdf7" }}>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <p className="text-6xl mb-5">🌾</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-500 mb-6 max-w-md">
            AgriTech Solutions encountered an unexpected error. Our team has been notified.
          </p>
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
            <a href="/" className="border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Go Home
            </a>
          </div>
          {error.digest && (
            <p className="text-gray-400 text-xs mt-6">Error ID: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  );
}
