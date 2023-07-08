import { Typography, Box } from "@mui/material";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { DataContext } from "../../Context/DataProvider";
export default function Profile({ account, setAccount }) {
  const { setpanelist } = useContext(DataContext);
  const [open, setopen] = useState(false);
  const handelClick = (event) => {
    setopen(event.currentTarget);
  };
  const handleClose = () => {
    setopen(false);
  };
  const Logoutuser = () => {
    setAccount("");
    setpanelist("");
  };
  return (
    <>
      <Box sx={{ cursor: "pointer", padding: "50px" }}>
        <Box onClick={handelClick} sx={{ display: "flex" }}>
          <AccountCircleIcon />
          <Typography sx={{ marginLeft: "2px" }}>{account}</Typography>
        </Box>
        <Menu
          anchorEl={open}
          open={Boolean(open)}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{ marginTop: "5px" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              Logoutuser();
            }}
          >
            <PowerSettingsNewIcon color="primary" fontSize="small" />
            <Typography sx={{ marginLeft: "20px", fontSize: "14px" }}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
