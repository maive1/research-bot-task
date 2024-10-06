// Tools for Open AI API

import { ChatCompletionTool } from "openai/resources";
import { getArticlesFunctionCallingStructure } from "./function-definition";

export const tools: Array<ChatCompletionTool> = [
  { type: "function", function: getArticlesFunctionCallingStructure },
];
