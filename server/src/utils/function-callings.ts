import { FunctionDefinition } from "openai/resources";

export const getArticlesFunctionCallingStructure: FunctionDefinition = {
  name: "getArticles",
  strict: true,
  description: "Fetch articles from OpenAlex using a generated URL.",
  parameters: {
    type: "object",
    properties: {
      url: {
        type: "string",
        description: "The URL to fetch articles from OpenAlex.",
      },
    },
    required: ["url"],
    additionalProperties: false,
  },
};
