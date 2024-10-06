import OpenAI from "openai";
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  ChatCompletionMessageParam,
  ChatModel,
} from "openai/resources";

import { query } from "express";
import { getArticleContent } from "./article-information";

export const OPEN_AI_MODEL: ChatModel = "gpt-4o-mini";

export class OpenAIUses {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
  }

  public async getChatCompletion(messages: Array<ChatCompletionMessageParam>) {
    if (messages.length === 0) throw new Error("Messages required");

    const params: ChatCompletionCreateParams = {
      messages,
      model: OPEN_AI_MODEL,
    };

    try {
      const response: ChatCompletion =
        await this.openai.chat.completions.create(params);

      return response?.choices[0]?.message.content;
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        const { status = 500, name } = error;

        throw new Error(name);
      }
      throw new Error("Internal server error");
    }
  }

  public createChunks(text: string, n: number): string[] {
    const sentences = text.split(/(?<=\.)/);
    const chunks: string[] = [];
    let chunk = "";

    for (let sentence of sentences) {
      if (chunk.length + sentence.length <= n) {
        chunk += sentence;
      } else {
        chunks.push(chunk);
        chunk = sentence;
      }
    }
    if (chunk) chunks.push(chunk);

    return chunks;
  }

  public async extractChunk(
    content: string,
    templatePrompt: string
  ): Promise<string> {
    const prompt = `${templatePrompt}${content}`;

    try {
      const response: ChatCompletion =
        await this.openai.chat.completions.create({
          model: OPEN_AI_MODEL,
          messages: [{ role: "system", content: prompt }],
          temperature: 0.0,
        });

      if (response.choices[0]?.finish_reason !== "stop") {
        throw new Error("Not enough information to summarize");
      }

      return response.choices[0]?.message.content || "";
    } catch (error) {
      console.error("Error en extractChunk:", error);
      throw error;
    }
  }

  public async summarizeText(pdfUrl: string) {
    const summaryPrompt = `Summarize this text from an academic paper. Extract any key points with reasoning.\n\nContent:`;

    const pdfText = await getArticleContent(pdfUrl);
    if (!pdfText) return "No text found";

    const chunks = this.createChunks(pdfText, 1500);

    const summaries: string[] = [];
    for (const chunk of chunks) {
      const summary = await this.extractChunk(chunk, summaryPrompt);
      summaries.push(summary);
    }

    const finalSummaryPrompt = `
      Write a summary collated from this collection of key points extracted from an academic paper.
      The summary should highlight the core argument, conclusions, and evidence, and answer the user's query.
      User query: ${query}
      The summary should be structured in bulleted lists following the headings Core Argument, Evidence, and Conclusions.
      Key points:\n${summaries.join("\n")}\nSummary:\n`;

    const finalSummary = await this.extractChunk(finalSummaryPrompt, "");
    return finalSummary;
  }
}
