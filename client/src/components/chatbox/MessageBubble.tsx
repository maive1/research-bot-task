import { Role } from "@/lib/types";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { FC } from "react";

interface MessageProps {
  role: Role;
  message: string;
}

const Message: FC<MessageProps> = ({ message, role }) => {
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
        <Typography variant="body1">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
