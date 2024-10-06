import { useEffect, useLayoutEffect, useState } from "react";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { sendMessage, startChatSession } from "@/services/chat";
import { useChatStore } from "@/store/chatStore";
import Feed from "./Feed";
import MessageInput from "./MessageInput";

const ChatBox = () => {
  const [prompt, setPrompt] = useState<string>("");

  const {
    saveMessage,
    currentConversation,
    storeChatIdSession,
    chatIdSession,
  } = useChatStore();

  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: sendMessage,
    onMutate: (newMessage) => {
      saveMessage({ role: "user", content: newMessage.message });
    },
    onError: (error) => {
      console.error(error);
      saveMessage({
        role: "assistant",
        content:
          "Sorry, I am unbable to process your request at the moment. Please try again later",
      });
    },
  });

  useEffect(() => {
    if (data && data.message) {
      console.log("data", data);
      saveMessage(data.message);
    }
  }, [data]);

  const handleSubmit = async (value: string) => {
    setPrompt("");

    if (!chatIdSession) return;
    await mutateAsync({ chatId: chatIdSession, message: value });
  };

  useLayoutEffect(() => {
    const initChatSession = async () => {
      const res = await startChatSession();
      storeChatIdSession(res.chatId);
      console.log("INIT CHAT SESSION", res);
    };

    initChatSession();
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        overflow: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Feed conversation={currentConversation} />
      <MessageInput
        message={prompt}
        handleChange={(value) => setPrompt(value)}
        onSumbit={handleSubmit}
        isLoading={isPending}
      />
    </Box>
  );
};

export default ChatBox;
