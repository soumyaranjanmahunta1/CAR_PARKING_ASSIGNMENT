import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "0.5%",
        marginTop: "60px",
        display: "flex",
        justifyContent: "space-evenly",
        position: "relative",
        [theme.breakpoints.down("md")]: {
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop:"65px"
        }
      }}
    >
      <Link to="/">
        <Button
          class="pushable"
          sx={{ background: "#FB641B", color: "white", height: "100%" }}
          variant="contained"
        >
          <span class="front"> Home</span>
        </Button>
      </Link>
      <Link to="/contact">
        <Button
          class="pushable"
          sx={{ background: "#FB641B", color: "white", height: "100%" }}
          variant="contained"
        >
          <span class="front" > Contact</span>
        </Button>
      </Link>
      <Link to="/request">
        <Button
          class="pushable"
          sx={{ background: "#FB641B", color: "white" }}
          variant="contained"
        >
          <span class="front"> Request Service</span>
        </Button>
      </Link>
      <Link to="/status/:requestId">
        <Button
          class="pushable"
          sx={{ background: "#FB641B", color: "white" }}
          variant="contained"
        >
          <span class="front"> Service Status</span>
        </Button>
      </Link>
      <Link to="/admin">
        <Button
          class="pushable"
          sx={{ background: "#FB641B", color: "white" }}
          variant="contained"
        >
          <span class="front">Admin Panel</span>
        </Button>
      </Link>
    </Box>
  );
}
