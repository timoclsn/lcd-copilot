"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { processResource } from "./actions";
import { Bot, Loader2 } from "lucide-react";
import { Label } from "../ui/label";

const initialState = {
  url: null,
};

export const AiForm = () => {
  const [state, formAction] = useFormState(processResource, initialState);
  return (
    <form action={formAction}>
      <div className="flex gap-2">
        <Input
          name="url"
          type="url"
          placeholder="https://lifecentereddesign.net"
          required
          className="flex-1"
        />
        <SubmitButton />
      </div>
      <p>{state.url}</p>
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="flex-none" disabled={pending}>
      {pending ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Bot size={18} />
      )}
      Submit
    </Button>
  );
};
