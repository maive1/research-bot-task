import { Box } from "@mui/material";
import { Feed, MessageInput } from "./components";

const ChatBox = () => {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Feed />
      <MessageInput />
    </Box>
  );
};

export default ChatBox;
