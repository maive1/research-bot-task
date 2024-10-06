import { Container, Paper } from "@mui/material";
import { AppBar, ChatBox } from "./components";

function App() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 5,
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          width: 700,
          height: "100%",
          minHeight: 500,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar />
        <ChatBox />
      </Paper>
    </Container>
  );
}

export default App;
