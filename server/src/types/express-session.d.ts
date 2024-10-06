import session from "express-session";
import { ChatCompletionMessage } from "openai/resources";

declare module "express-session" {
  interface SessionData {
    messages: { [chatId: string]: Array<ChatCompletionMessageParam> };
  }
}
