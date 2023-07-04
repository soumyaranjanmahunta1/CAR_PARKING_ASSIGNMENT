import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import LoginDialog from "../Header/Login/LoginDialog";
import { DataContext } from "../../Context/DataProvider";
export default function CustomButtons() {
  const { account, setAccount } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ display: "flex", margin: "0 40% 0 5%", alignItems: "center" }}>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <Button
          variant="contained"
          sx={{
            marginRight: "10%",
            color: "#2874F0",
            background: "#FFF",
            fontWeight: "600",
            borderRadius: "1px",
            textTransform: "none",
            padding: "4px 40px",
            height: "30px",
            boxShadow: "none",
          }}
          onClick={openDialog}
        >
          Login
        </Button>
      )}

      <Link to="/bookslot">
        <Button
          sx={{
            color: "#2874F0",
            background: "#FFF",
            fontWeight: "600",
            borderRadius: "1px",
            textTransform: "none",
            padding: "4px 10px",
            height: "30px",
            boxShadow: "none",
          }}
        >
          BookSlot
        </Button>
      </Link>

      <LoginDialog open={open} setOpen={setOpen} />
    </Box>
  );
}
