import { Send } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const MessageInput = () => {
  const theme = useTheme();
  const [message, setMessage] = useState<string>("");

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;
    // TODO: Send message to the server
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <Stack
      sx={{ padding: 3, backgroundColor: theme.palette.background.default }}
    >
      <form onSubmit={handleSend}>
        <FormControl
          sx={{ width: "100%", display: "flex", flexDirection: "row" }}
        >
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="Message for article search help"
            onKeyDown={handleKeyDown}
            sx={{
              flexGrow: 1,
              backgroundColor: theme.palette.background.default,
              border: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
          <IconButton type="submit" color="primary" size="large">
            <Send />
          </IconButton>
        </FormControl>
      </form>
    </Stack>
  );
};

export default MessageInput;
