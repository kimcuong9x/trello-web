import React from "react";
import {Box} from "@mui/system";

function BoardBar() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        width: "100%",
        height: (theme) => theme.trello.appBoardHeight,
        alignItems: "center",
        display: "flex",
      }}
    >
      Boad bar
    </Box>
  );
}

export default BoardBar;
