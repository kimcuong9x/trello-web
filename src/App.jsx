import Button from "@mui/material/Button";
import {useColorScheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import {Box, Container} from "@mui/material";
import theme from "./theme";

function ModeSelect() {
  const {mode, setMode} = useColorScheme();
  const handleChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };

  return (
    <FormControl sx={{m: 1, minWidth: 120}} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <LightModeIcon fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <DarkModeIcon fontSize="small" /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <SettingsBrightnessIcon fontSize="small" /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{height: "100vh"}}>
      <Box
        sx={{
          backgroundColor: "primary.light",
          width: "100%",
          height: (theme) => theme.trello.appBarHeight,
          alignItems: "center",
          display: "flex",
        }}
      >
        <ModeSelect />
      </Box>
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
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: (theme) =>
            `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.appBoardHeight})`,
          alignItems: "center",
          display: "flex",
        }}
      >
        Content
      </Box>
    </Container>
  );
}

export default App;
