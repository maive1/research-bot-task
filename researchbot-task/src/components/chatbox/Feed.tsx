import { FC, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import MessageBubble from "./MessageBubble";
import { Message } from "@/lib/types";

interface FeedProps {
  conversation: Array<Message>;
}

const Feed: FC<FeedProps> = ({ conversation }) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }} ref={messagesRef}>
      {conversation.length > 0 &&
        conversation.map(({ role, content }, index) => (
          <MessageBubble key={index} role={role} message={content} />
        ))}

      <div ref={messagesRef}></div>
    </Box>
  );
};

export default Feed;
