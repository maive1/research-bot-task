import { Message } from "@/lib/types";
import { create } from "zustand";

interface ChatStoreProps {
  chatIdSession: string | undefined;
  currentConversation: Array<Message>;
  clearChat: () => void;
  saveMessage: (newMessage: Message) => void;
  storeChatIdSession: (chatId: string) => void;
}

export const useChatStore = create<ChatStoreProps>((set) => ({
  chatIdSession: undefined,
  currentConversation: [],
  clearChat: () =>
    set(() => ({ currentConversation: [], chatIdSession: undefined })),
  storeChatIdSession: (chatId: string) =>
    set(() => ({ chatIdSession: chatId })),
  saveMessage: (newMessage: Message) =>
    set((state) => ({
      currentConversation: [...state.currentConversation, newMessage],
    })),
}));
