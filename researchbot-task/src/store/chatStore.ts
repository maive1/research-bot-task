import { create } from "zustand";
import { ChatLog } from "../types/chat";

interface ChatStoreProps {
  chatLogs: Array<ChatLog>;
  clearChatLogs: () => void;
  saveChatLogs: (newMessage: ChatLog) => void;
}

export const useChatStore = create<ChatStoreProps>((set) => ({
  chatLogs: [],
  clearChatLogs: () => set({ chatLogs: [] }),
  saveChatLogs: (newMessage: ChatLog) =>
    set((state) => ({ chatLogs: [...state.chatLogs, newMessage] })),
}));
