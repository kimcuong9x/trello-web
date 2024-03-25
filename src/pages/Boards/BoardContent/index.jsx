import React from "react";
import {Box} from "@mui/system";

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        width: "100%",
        height: (theme) =>
          `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.appBoardHeight})`,
        alignItems: "center",
        display: "flex",
      }}
    >
      Content
    </Box>
  );
}

export default BoardContent;
