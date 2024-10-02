import camelcaseKeys from "camelcase-keys";
import { OpenAiSystemRole } from "../utils/prompt-system";
import { Article } from "../types/articles";
import { Message } from "../types/chat";

const getArticles = async (url: string): Promise<Array<Article>> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to get articles");
  }

  const { results = [] } = await response.json();

  if (!results) {
    throw new Error("No articles found");
  }

  const totalArticles = camelcaseKeys(results, { deep: true });
  return totalArticles;
};

// const sendMessage = async (messages: Array<Message>) => {
//   const response = await fetch(
//     `${import.meta.env.VITE_OPENAI_API_URL}/v1/chat/completition`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini",
//         messages: [OpenAiSystemRole, ...messages],
//         temperature: 0.5,
//       }),
//     }
//   );
//   return response.json();
// };

const sendMessage = async (message: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/sendmessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: JSON.stringify({ message: message }),
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export { getArticles, sendMessage };
