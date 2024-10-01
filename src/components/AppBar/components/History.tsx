import { FC, useState } from "react";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Notes } from "@mui/icons-material";

export interface Search {
  id: string;
  title: string;
}

interface ChatHistoryProps {
  searches: Array<Search>;
  handlePreviousSearch: (searchId: string) => void;
}

export const History: FC<ChatHistoryProps> = ({
  searches,
  handlePreviousSearch,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelectionSearch = (searchId: string) => {
    setAnchorEl(null);
    handlePreviousSearch(searchId);
  };
  return (
    <>
      <Tooltip title="Chat history" arrow>
        <IconButton
          aria-controls={open ? "history-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ mr: 2 }}
        >
          <Notes />
        </IconButton>
      </Tooltip>
      <Menu
        id="history-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 400,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {searches.length === 0 ? (
          <MenuItem disabled>No recent searches</MenuItem>
        ) : (
          <>
            <Typography variant="h6" color="primary" sx={{ padding: 2 }}>
              Recent
            </Typography>
            <Divider />
            {searches.map(({ id, title }) => (
              <MenuItem key={id} onClick={() => onSelectionSearch(id)}>
                {title}
              </MenuItem>
            ))}
          </>
        )}
      </Menu>
    </>
  );
};
