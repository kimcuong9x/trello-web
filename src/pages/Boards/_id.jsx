import React from "react";
import {Box, Container} from "@mui/material";
import AppBar from "../../components/AppBar";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent";

function Boards() {
  return (
    <Container disableGutters maxWidth={false} sx={{height: "100vh"}}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  );
}

export default Boards;
