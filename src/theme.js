// import {createTheme} from '@mui/material/styles';
import {experimental_extendTheme as extendTheme} from "@mui/material/styles";
import {deepOrange, orange, cyan, teal} from "@mui/material/colors";

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: "48px",
    appBoardHeight: "58px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
      spacing: (factor) => `${0.25 * factor}rem`,
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
      spacing: (factor) => `${0.25 * factor}rem`,
    },
  },
  // ...other properties
});

export default theme;
