"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex justify-center items-start gap-4">
        <h2 className="font-black text-3xl">Something went wrong!</h2>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
