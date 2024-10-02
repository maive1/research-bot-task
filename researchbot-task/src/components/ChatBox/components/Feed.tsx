import { FC, Fragment, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { ChatLog } from "../../../types/chat";
import Message from "./Message";
import ResearchArticleInformationCard from "./ResearchArticleInformationCard";

interface FeedProps {
  chatHistory: Array<ChatLog>;
}

const Feed: FC<FeedProps> = ({ chatHistory }) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Box
      sx={{ flex: 1, overflowY: "auto", padding: 2, m: 2 }}
      ref={messagesRef}
    >
      {chatHistory.length > 0 &&
        chatHistory.map(({ title, user, message, articles = [] }) => (
          <Fragment key={title}>
            <Message role={user} content={message} />
            {articles.length > 0 &&
              articles.map(
                ({
                  authors = [],
                  publicationYear,
                  displayName = "",
                  citedByCount,
                }) => (
                  <ResearchArticleInformationCard
                    key={`${displayName}-${publicationYear}`}
                    title={displayName}
                    year={publicationYear}
                    citationCount={citedByCount}
                    authors={authors}
                  />
                )
              )}
          </Fragment>
        ))}

      <div ref={messagesRef}></div>
    </Box>
  );
};

export default Feed;
