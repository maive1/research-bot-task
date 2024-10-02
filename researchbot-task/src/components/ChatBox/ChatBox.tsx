import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSendMessages } from "../../actions/useSendMessage";
import { useChatStore } from "../../store/chatStore";
import { Feed, MessageInput } from "./components";
import { isValidUrl } from "../../utils/validate-url";

const ChatBox = () => {
  const [prompt, setPrompt] = useState<string>("");

  const { saveChatLogs, chatLogs } = useChatStore();
  const { data, mutate, isPending, isSuccess, isError } = useSendMessages();
  const { message, articles = [] } = data || {};

  const handleSubmit = (value: string) => {
    setPrompt("");
    saveChatLogs({ title: value, user: "user", message: value });
    mutate(value);
  };

  useEffect(() => {
    if (message?.content) {
      const isURL = isValidUrl(message.content);
      if (!isURL && isSuccess) {
        saveChatLogs({
          title: message.content.trim(),
          user: message.role,
          message: message.content,
          articles: articles?.length ? articles : [],
        });
      }
    }
  }, [message]);

  useEffect(() => {
    if (isError) {
      saveChatLogs({
        title: "Error",
        user: "assistant",
        message: "An error occurred while processing your request",
      });
    }
  }, [isError]);

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
      <Feed chatHistory={chatLogs} />
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
