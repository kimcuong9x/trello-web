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
              color: "white",
              cursor: "pointer",
              "&:fist-of-type": {
                bgcolor: "#a4b0be",
              },
            },
          }}
        >
          <Tooltip title="Cristiano Ronaldo">
            <Avatar
              alt="Cristiano Ronaldo"
              src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
            />
          </Tooltip>
          <Tooltip title="Lee Yeon-hee">
            <Avatar
              alt="Lee Yeon-hee"
              src="https://phunuso.mediacdn.vn/thumb_w/640/603486343963435008/2023/8/28/lee-yeonhee-1693204420452909006363.jpg"
            />
          </Tooltip>
          <Tooltip title="Rose">
            <Avatar
              alt="Rose"
              src="https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg"
            />
          </Tooltip>
          <Tooltip title="Son Ye-jin">
            <Avatar
              alt="Son Ye-jin"
              src="https://media.vov.vn/sites/default/files/styles/large/public/2021-06/247a122a-8e00-4e46-baa7-6839fbabc297_screen_shot_2020-08-26_at_3.34.32_pm.png.jpeg"
            />
          </Tooltip>
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
