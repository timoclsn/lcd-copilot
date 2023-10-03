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
  const websiteSource = await urlResponse.text();

  const titleRegex = /<title>(.*?)<\/title>/i;
  const titleMatch = websiteSource.match(titleRegex);
  const title = titleMatch ? titleMatch[1] : "";

  const descriptionRegex = /<meta\s+name="description"\s+content="([^"]*)"/i;
  const descriptionMatch = websiteSource.match(descriptionRegex);
  const description = descriptionMatch ? descriptionMatch[1] : "";

  const websiteTextClean =
    websiteSource
      // Remove script tag content
      .replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        "<script></script>"
      )
      // Remove style tag content
      .replace(
        /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
        "<style></style>"
      )
      // Remove all xml tags
      .replace(/<[^>]*>/g, "|")
      // Replace all line breaks
      .replace(/\r?\n|\r/g, "")
      // Replace multiple spaces
      .replace(/ {2,}/g, "")
      // Replace multiple dots with one
      .replace(/\.{2,}/g, ". ")
      // Replace multiple pipes with one
      .replace(/\|{2,}/g, "|")
      // Only use the first 10000 characters
      .substring(0, 10000) + "...";

  const prompt = `
    After the instructions I am going to give you a markdown table with categroies and the text content of a website as context.

    Instructions:
    - Your job is to figure out how the website content can be categorized.
    - Only use the provided categories from the table – never invent new ones!
    - Answer only with the one category you are most confident with – never list multiple categories!
    - Fill out the fields for that category like this example: "Field Title: Field Value."
    - Convert the field names from camel case to title case
    - Format dates like this example: "Date: September 27, 2023 (2023-09-27)"
    - If you can't figure out the content for a field just add a -
    - Don't copy the text from the website – say it in you own words but leave titles and name how they are.
    - Answer in markdown format with the name of the category as the headline (level 2) and the fields as a unordered list.
    - Make the field names bold

    \n----------------\n

    CATEGORY TABLE: 
    | Category | Fields |
    | --- | --- |
    | **Thoughtleader** | name, jobDescription |
    | **Article** | title, authors, date, duration, topics |
    | **Book** | title, authors, publisher, isbn, topics |
    | **Podcast** | title, hosts, topics, podcastEpisodes |
    | **Podcast Episode** | title, podcast, guests, date, duration, topics |
    | **Directory** | name, description, topics |
    | **Video** | title, creators, date, duration, topics |
    | **Tool** | name, description, topics |
    | **Community** | name, description, topics |
    | **Course** | name, description, topics |
    | **Example** | name, description, topics |
    | **Agency** | name, description, topics |
    | **Slide** | title, authors, date, topics |
    | **Magazine** | name, description, topics |
    | **Newsletter** | name, authors, description, frequency, topics |
    | **Paper** | title, authors, date, journal, topics |
    | **Social Media Profile** | name, handle, description, topics |
    | **Report** | title, authors, date, description, topics |

    WEBSITE TITLE: ${title}

    WEBSITE DESCRIPTION: ${description}

    WEBSITE CONTENT: \`\`\`
    ${websiteTextClean}
    \`\`\`
  `;

  // console.log(prompt);

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "You are my AI web scraper. Your job is to make sense of the text content of a website and put it into a category.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const answer = aiResponse.choices[0].message.content;
  return <ReactMarkdown className="prose">{answer}</ReactMarkdown>;
};
