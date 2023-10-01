import { Answer } from "@/components/Answer";
import { ResourceInput } from "@/components/ResourceInput";
import { SearchParams } from "@/lib/types";
import Link from "next/link";
import { Suspense } from "react";
import { z } from "zod";

export const runtime = "edge";

const searchParamsSchema = z.object({
  url: z.coerce.string().optional(),
});

interface Props {
  searchParams: SearchParams;
}

export default function Home({ searchParams }: Props) {
  const { url } = searchParamsSchema.parse(searchParams);

  return (
    <main className="w-full p-8">
      <section className="max-w-screen-sm mx-auto">
        <Link href="/" className="hover:underline">
          <h1 className="text-4xl font-black text-center mb-8">LCD Copilot</h1>
        </Link>
        <Suspense>
          <ResourceInput />
        </Suspense>
        {url && (
          <Suspense fallback={<div>Processing…</div>}>
            <Answer url={url} />
          </Suspense>
        )}
      </section>
    </main>
  );
}
