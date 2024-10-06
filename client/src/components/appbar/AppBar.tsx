import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { FindInPage } from "@mui/icons-material";
import { History, Search } from "./History";
import { useChatStore } from "../../store/chatStore";

const ChatAppBar = () => {
  const { clearChat } = useChatStore();

  //TODO: Implement the logic to get the searches from the store
  const searches: Array<Search> = [];

  const handleOpenNewSearch = () => {
    clearChat();
    //TODO: Implement the logic to open a new search with routing
  };
  const handlePreviousSearch = () => {
    //TODO: Implement the logic to open a previous search with routing
  };

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
