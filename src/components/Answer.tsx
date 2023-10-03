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
        content: `After the instructions I am going to give you a markdown table and the text content of a website. 
        Your job is to figure out how the website content can be categorized. 
        Only use the provided categories – never invent new ones! 
        Answer only with the one category you are most confident with – never list multiple categories! 
        Fill out the fields for that category like this example: "Field Title: Field Value."
        Convert the field names from camel case to title case.
        Format dates like this example: "Date: September 27, 2023 (2023-09-27)".
        If you can't figure out the a field just add a '-'. 
        Answer in markdown format with the name of the category as the headline (level 2) and the fields as a unordered list. 

        \n----------------\n
  
        TABLE: ${prismaSchema}

        \n----------------\n

        WEBSITE CONTENT:

        \`\`\`
        ${urlTextWithoutTags.substring(0, 3500)}
        \`\`\`
        `,
      },
    ],
  });

  const answer = aiResponse.choices[0].message.content;
  return <ReactMarkdown className="prose">{answer}</ReactMarkdown>;
};
