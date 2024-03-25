import React from "react";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import {Box, Button, Tooltip} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function BoardBar() {
  const MENU_STYLES = {
    color: "white",
    backgroundColor: "transparent",
    px: "5px",
    borderRadius: "4px",
    border: "none",
    ".MuiSvgIcon-root": {
      color: "white",
    },
    "&:hover": {
      backgroundColor: "primary.50",
    },
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.appBoardHeight,
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        px: 2,
        overflowX: "auto",
        borderBottom: "1px solid white",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box sx={{alignItems: "center", display: "flex", gap: 2}}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="KimCuongDev Mern Stack"
          onClick
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspaces"
          onClick
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          onClick
        />
        <Chip sx={MENU_STYLES} icon={<BoltIcon />} label="Automation" onClick />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          onClick
        />
      </Box>

      <Box sx={{alignItems: "center", display: "flex", gap: 2}}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {borderColor: "white"},
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: "34px",
              height: "34px",
              fontSize: "16px",
              border: "none",
            },
          }}
        >
          <Tooltip title="KimCuongDev">
            <Avatar
              alt="KimCuongDev"
              src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
