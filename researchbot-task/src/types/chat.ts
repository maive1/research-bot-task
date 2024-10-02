import { Article } from "./articles";

export type Role = "user" | "assistant" | "system";

export interface Message {
  role: Role;
  content: string;
}

export interface ChatLog {
  title: string;
  user: Role;
  message: string;
}

export interface ChatResponse {
  articles?: Array<Article>;
  message: Message;
}

export interface ChatSettings {
  id: number;
  author: string;
  icon?: any;
  name: string;
  description?: string;
  instructions?: string;
  model: string | null;
  seed?: number | null;
  temperature?: number | null;
  top_p?: number | null;
  showInSidebar?: number;
}
