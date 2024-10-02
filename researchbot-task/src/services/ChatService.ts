import camelcaseKeys from "camelcase-keys";
import { Article, ResultsOpenAlex } from "../types/articles";

const getArticles = async (url: string): Promise<Array<Article>> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to get articles");
  }

  const { results = [] } = await response.json();

  if (!results) {
    throw new Error("No articles found");
  }

  const parseResult = camelcaseKeys(results, { deep: true });

  const articles: Article[] = parseResult.map((result: ResultsOpenAlex) => ({
    id: result?.id,
    displayName: result?.displayName,
    publicationYear: result?.publicationYear,
    citedByCount: Number(result?.citedByCount),
    externalId: result?.doi,
    isOa: result?.primaryLocation?.isOa,
    summary: result?.primaryLocation?.landingPageUrl,
    authors: result?.authorships?.map((author) => author?.rawAuthorName) || [],
  }));

  return articles;
};

const sendMessage = async (message: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/sendmessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: JSON.stringify({ message: message }),
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export { getArticles, sendMessage };
