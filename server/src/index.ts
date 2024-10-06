import express, { Express, Request } from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionToolMessageParam,
} from "openai/resources";
import { v4 as uuidv4 } from "uuid";
import session, { Session } from "express-session";
import { getArticles } from "./helpers/article-information";
import { tools } from "./utils/tools";
import { OPEN_AI_MODEL, OpenAIUses } from "./helpers/openai-summarize";
import { builtUrl } from "./utils/prompts";

dotenv.config();

export interface CustomSessionData extends Session {
  messages: {
    [key: string]: ChatCompletionMessageParam[];
  };
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 * 60 },
  })
);

const openAiUses = new OpenAIUses();

let conversations: Record<
  string,
  Array<ChatCompletionMessageParam> | undefined
>;

app.post("/start-chat", (req: Request, res) => {
  const chatId = uuidv4();

  // TODO: session store
  // const session = req.session as CustomSessionData;

  conversations = { [chatId]: [] };

  res.json({ chatId, message: "New session" });
});

app.post(
  "/sendmessage/:chatId",
  async (req: Request, res: express.Response): Promise<any> => {
    const { chatId = "" } = req.params;
    const { message = "" } = req.body;

    if (!conversations[chatId]) {
      return res.status(404).send({ error: "Chat not found" });
    }

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    if (conversations[chatId].length === 0) {
      conversations[chatId].push({
        role: "system" as const,
        content: builtUrl,
      });
    }
    conversations[chatId].push({ role: "user", content: message });
    // const conversationMessages: Array<ChatCompletionMessageParam> = [
    //   ...(conversations[chatId]?.length > 0
    //     ? conversations[chatId]
    //     : [{ role: "system" as const, content: builtUrl }]),
    //   { role: "user" as const, content: message },
    // ];

    console.log({ conversations });
    try {
      const response = await openai.chat.completions.create({
        model: OPEN_AI_MODEL,
        messages: conversations[chatId],
        tools,
        temperature: 0.4,
      });
      console.log({ response });

      const choice = response.choices[0];
      conversations[chatId].push(choice?.message as ChatCompletionMessageParam);
      console.log("finish", choice?.finish_reason);
      if (choice?.finish_reason === "tool_calls") {
        const toolCall: Array<ChatCompletionMessageToolCall | undefined> =
          choice.message?.tool_calls ? choice.message.tool_calls : [];

        if (toolCall.length > 0) {
          const tool = toolCall[0] as ChatCompletionMessageToolCall;
          const argumentToolcall = JSON.parse(tool.function.arguments);

          const articles = await getArticles(argumentToolcall.url);
          console.log("RESPONDE ARTICLES", articles[0]);
          if (articles.length > 0) {
            for (const index in articles) {
              const pdfUrl = articles[index]?.pdf_url;
              if (pdfUrl) {
                const summary = await openAiUses.summarizeText(pdfUrl);
                if (articles[index]) {
                  articles[index].summary = summary;
                }
              }
            }
          }
          console.log({ articles });
          const functionCallResultMessage: ChatCompletionToolMessageParam = {
            role: "tool",
            content: JSON.stringify({ url: argumentToolcall.url, articles }),
            tool_call_id: tool.id,
          };

          conversations[chatId].push(functionCallResultMessage);

          const finalResponse = await openai.chat.completions.create({
            model: OPEN_AI_MODEL,
            messages: conversations[chatId],
          });
          console.log({ finalResponse });
          const finalMessage = finalResponse?.choices[0]?.message;
          if (finalMessage) conversations[chatId].push(finalMessage);

          return res.json({
            message: finalResponse?.choices[0]?.message,
          });
        }
      }

      if (!choice) throw new Error("Error");
      if (choice.finish_reason === "length")
        throw new Error("conversation exceeded the maximum length");
      if (choice.finish_reason === "content_filter")
        throw new Error("Not appropiated message");

      return res.json({
        message: { content: choice.message.content, role: "assistant" },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: `${error}` });
    }
  }
);

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});
