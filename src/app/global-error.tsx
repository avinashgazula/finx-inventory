"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col justify-center">
        <h2 className="font-bold text-3xl">
          Something went wrong! {error.message}
        </h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
