import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSendMessages } from "../../actions/useSendMessage";
import { useChatStore } from "../../store/chatStore";
import { Feed, MessageInput } from "./components";

const ChatBox = () => {
  const [prompt, setPrompt] = useState<string>("");

  const { saveChatLogs, chatLogs } = useChatStore();
  const { data, mutate, isPending, isSuccess } = useSendMessages();
  const { message } = data || {};

  const handleSubmit = (value: string) => {
    setPrompt("");
    saveChatLogs({ title: value, user: "user", message: value });
    mutate(value);
  };

  useEffect(() => {
    if (message && isSuccess) {
      saveChatLogs({
        title: message.content.trim(),
        user: message.role,
        message: message.content,
      });
    }
  }, [message]);

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
      <Feed logs={chatLogs} />
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
