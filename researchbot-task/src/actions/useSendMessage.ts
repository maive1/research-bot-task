import { getArticles, sendMessage } from "../services/ChatService";
import { useMutation } from "@tanstack/react-query";
import { ChatResponse } from "../types/chat";
import { isValidUrl } from "../utils/validate-url";
import { Article } from "../types/articles";

export const useSendMessages = () => {
  return useMutation<ChatResponse, Error, string>({
    mutationFn: async (message: string): Promise<ChatResponse> => {
      const assistantResponse = await sendMessage(message);

      let articles: Array<Article> = [];
      if (isValidUrl(assistantResponse.content)) {
        articles = await getArticles(assistantResponse.content);

        if (articles.length === 0) {
          throw new Error("No articles found");
        }
        const secondResponse = await sendMessage(JSON.stringify(articles[0]));
        return { articles, message: secondResponse };
      }

      return { articles, message: assistantResponse };
    },
    onSuccess: () => {
      //TODO
      console.log("Message sent successfully");
    },
    onError: (error) => {
      //TODO
      console.error("Error sending message:", error);
    },
  });
};
