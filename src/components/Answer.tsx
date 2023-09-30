import { prismaSchema } from "@/lib/prompt";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface Props {
  url: string;
}

export const Answer = async ({ url }: Props) => {
  const urlResponse = await fetch(url);
  const urlText = await urlResponse.text();
  const urlTextWithoutScriptContent = urlText.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "<script></script>"
  );
  const urlTextWithoutTags = urlTextWithoutScriptContent.replace(
    /<[^>]*>/g,
    "."
  );

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    messages: [
      {
        role: "user",
        content: `After the instructions I am going to give you a database schmema in a markdown format (each list is a category with its resprective fields) and the content of a website as html. 
        Your job is to figure out, in which of the categories the website content as a whole belongs to. 
        Answer only with the category you are most confident with – never list multiple categories! 
        Only use the categories that are given in the database schema – never invent new ones! 
        Fill out the fields for that category. 
        Answer in markdown format. 
        Answer with the name of the category as the headline (level 2) and the fields as a markdown list. 

        \n----------------\n
  
        DATABASE SCHEMA: ${prismaSchema}

        \n----------------\n

        WEBSITE CONTENT: ${urlTextWithoutTags.substring(0, 3500)}
        `,
      },
    ],
  });

  const answer = aiResponse.choices[0].message.content;
  return <ReactMarkdown className="prose">{answer}</ReactMarkdown>;
};
