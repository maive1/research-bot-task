import { Box, Typography } from "@mui/material";

const ChatBox = () => {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: "auto",
        height: "100vh",
      }}
    >
      <Typography variant="h1" color="primary">
        CHAT
      </Typography>
    </Box>
  );
};

export default ChatBox;
