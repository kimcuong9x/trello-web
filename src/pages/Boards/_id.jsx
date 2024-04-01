import React from "react";
import {Box, Container} from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import {mockData} from "~/apis/mock-data";

function Boards() {
  return (
    <Container disableGutters maxWidth={false} sx={{height: "100vh"}}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board}/>
    </Container>
  );
}

export default Boards;
