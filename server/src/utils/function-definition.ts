import { FunctionDefinition } from "openai/resources";

export const getArticlesFunctionCallingStructure: FunctionDefinition = {
  name: "getArticles",
  strict: true,
  description: "Fetches articles from OpenAlex API using the generated URL",
  parameters: {
    type: "object",
    properties: {
      url: {
        type: "string",
        description: "The URL to fetch articles from",
      },
    },
    required: ["url"],
    additionalProperties: false,
  },
};
