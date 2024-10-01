import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { FindInPage } from "@mui/icons-material";
import { History, Search } from "./components/History";

const ChatAppBar = () => {
  //TODO: Implement the custom hook useChatHistory to manage the chat history
  const searches: Array<Search> = [];
  const handleOpenNewSearch = () => {};
  const handlePreviousSearch = () => {};

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff", top: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <History
          searches={searches}
          handlePreviousSearch={handlePreviousSearch}
        />
        <Typography variant="h6" color="primary">
          ResearchBot
        </Typography>
        <Tooltip title="New search" arrow>
          <IconButton aria-label="new search" onClick={handleOpenNewSearch}>
            <FindInPage />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default ChatAppBar;
