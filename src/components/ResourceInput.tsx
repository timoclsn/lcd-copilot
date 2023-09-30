"use client";

import { Bot, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FormEvent, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

export const ResourceInput = () => {
  const { push, refresh } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = formData.get("url");
    if (!url) return;

    const searchParams = new URLSearchParams({ url: String(url) });

    startTransition(() => {
      push(`${pathname}?${searchParams}`);
      refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 items-center mb-10">
        <Label htmlFor="url" className="sr-only">
          Resource URL:
        </Label>
        <Input
          name="url"
          type="url"
          placeholder="https://lifecentereddesign.net"
          required
          className="flex-1"
        />
        <Button type="submit" className="flex-none" disabled={isPending}>
          {isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Bot size={18} />
          )}
          Submit
        </Button>
      </div>
    </form>
  );
};
