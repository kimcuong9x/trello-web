// import ModeSelect from "~/components/ModeSelect";
import ModeSelect from "~/components/ModeSelect";
import {
  Box,
  Typography,
  Button,
  TextField,
  Badge,
  Tooltip,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import {ReactComponent as TrelloLogo} from "~/assets/trello.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/starred";
import Templates from "./Menus/templates";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";

function AppBar() {
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
      }}
    >
      <Box sx={{alignItems: "center", display: "flex", gap: 2}}>
        <AppsIcon sx={{color: "primary.main"}} />
        <Box sx={{alignItems: "center", display: "flex", gap: 0.5}}>
          <SvgIcon
            fontSize="small"
            component={TrelloLogo}
            inheritViewBox
            sx={{color: "primary.main"}}
          />
          <Typography
            variant="span"
            sx={{fontSize: "1.2rem", fontWeight: "bold", color: "primary.main"}}
          >
            Trello
          </Typography>
        </Box>

        <Box sx={{display: {xs: "none", md: "flex"}, gap: 1}}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined">Create</Button>
        </Box>
      </Box>
      <Box sx={{alignItems: "center", display: "flex", gap: 2}}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="search"
          size="small"
          sx={{minWidth: "120px"}}
        />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" sx={{cursor: "pointer"}}>
            <NotificationsNoneIcon sx={{color: "primary.main"}} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{cursor: "pointer", color: "primary.main"}} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  );
}

export default AppBar;
