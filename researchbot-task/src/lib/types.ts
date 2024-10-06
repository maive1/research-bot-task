export interface Article {
  id: string;
  displayName: string;
  publicationYear: number;
  citedByCount: number;
  worksCount: number;
  externalId: string;
  isOa: boolean;
  summary: string;
  authors: Array<string>;
}

export type Role = "user" | "assistant";

export interface Message {
  role: Role;
  content: string;
}

export interface ChatResponse {
  message: Message;
}
