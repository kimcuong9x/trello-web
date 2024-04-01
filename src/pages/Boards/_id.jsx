import React from "react";
import {Box, Container} from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

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
