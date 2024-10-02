import { FC, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { ChatLog } from "../../../types/chat";
import Message from "./Message";

interface FeedProps {
  logs: Array<ChatLog>;
}

const Feed: FC<FeedProps> = ({ logs }) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }} ref={messagesRef}>
      {logs.length > 0 &&
        logs.map((log) => (
          <Message key={log.title} role={log.user} content={log.message} />
        ))}
      <div ref={messagesRef}></div>

      {/* <ResearchArticleInformationCard
        title="AI"
        year={1992}
        citationCount={900}
        authors={["Tom"]}
      /> */}
    </Box>
  );
};

export default Feed;
