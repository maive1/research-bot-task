import { getArticles, sendMessage } from "../services/ChatService";
import { useMutation } from "@tanstack/react-query";
import { ChatResponse } from "../types/chat";
import { isValidUrl } from "../utils/validate-url";
import { Article } from "../types/articles";

export const isValidOpenAlexUrl = (url: string): boolean => {
  const baseUrl = import.meta.env.VITE_OPEN_ALEX_API_URL;
  return url.startsWith(baseUrl);
};

export const useSendMessages = () => {
  return useMutation<ChatResponse, Error, string>({
    mutationFn: async (message: string): Promise<ChatResponse> => {
      const assistantResponse = await sendMessage(message);

      console.log({ assistantResponse });
      let articles: Array<Article> = [];
      if (isValidUrl(assistantResponse.content)) {
        articles = await getArticles(assistantResponse.content);
      }
      console.log({ articles });
      return { articles, message: assistantResponse };
    },
    onSuccess: () => {
      console.log("Message sent successfully");
    },
  });
};
