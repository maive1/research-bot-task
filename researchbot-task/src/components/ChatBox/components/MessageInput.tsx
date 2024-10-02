import React, { FC } from "react";
import { Send } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";

interface MessageInputProps {
  message: string;
  handleChange: (message: string) => void;
  onSumbit: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: FC<MessageInputProps> = ({
  message,
  handleChange,
  onSumbit,
  isLoading,
}) => {
  const theme = useTheme();

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;
    onSumbit(message);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isLoading || !message) return;
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
            onChange={(e) => handleChange(e.target.value)}
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
          <IconButton
            type="submit"
            color="primary"
            size="large"
            disabled={isLoading || !message}
          >
            <Send />
          </IconButton>
        </FormControl>
      </form>
    </Stack>
  );
};

export default MessageInput;
