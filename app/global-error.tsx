'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Global Error:", error);

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-md rounded-xl max-w-md">
          <h1 className="text-2xl font-semibold mb-3 text-red-600">
            Something went wrong
          </h1>

          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Please try again.
          </p>

          <button onClick={() => reset()}>
            Try again
          </button>

          {error?.digest && (
            <p className="text-xs text-gray-500 mt-4">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
