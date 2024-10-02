import { create } from "zustand";
import { ChatLog } from "../types/chat";

interface ChatStoreProps {
  previousChat: Array<any>;
  chatLogs: Array<ChatLog>;
  savePreviousChat: (chat: any) => void;
  clearChatLogs: () => void;
  saveChatLogs: (newMessage: ChatLog) => void;
}

export const useChatStore = create<ChatStoreProps>((set) => ({
  chatLogs: [],
  previousChat: [],
  savePreviousChat: (chat: Array<any>) =>
    set((state) => ({ previousChat: [...state.previousChat, ...chat] })),
  clearChatLogs: () => set({ chatLogs: [] }),
  saveChatLogs: (newMessage: ChatLog) =>
    set((state) => ({ chatLogs: [...state.chatLogs, newMessage] })),
}));
