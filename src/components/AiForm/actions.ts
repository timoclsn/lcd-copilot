"use server";

import { z } from "zod";

const schema = z.object({
  url: z.string().url(),
});

export const processResource = async (prevState: any, formData: FormData) => {
  const { url } = schema.parse({
    url: formData.get("url"),
  });

  return {
    url,
  };
};
