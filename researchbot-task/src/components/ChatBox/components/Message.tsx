import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { Role } from "../../../types/chat";

interface MessageProps {
  role: Role;
  content: string;
}

const Message: FC<MessageProps> = ({ content, role }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor:
          role === "user" ? theme.palette.background.default : "#ffffff",
        borderRadius: 3,
        m: 2,
      }}
    >
      <CardContent>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
