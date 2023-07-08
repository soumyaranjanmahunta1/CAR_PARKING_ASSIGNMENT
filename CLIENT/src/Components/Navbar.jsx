import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Box
          sx={{
          padding:"0.5%",
        marginTop: "60px",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Link to="/">
        <Button
          sx={{ background: "#FB641B", color: "white", height: "100%", }}
          variant="contained"
        >
          Home
        </Button>
      </Link>
      <Link to="/contact">
        <Button
          sx={{ background: "#FB641B", color: "white", height: "100%" }}
          variant="contained"
        >
          Contact
        </Button>
      </Link>
      <Link to="/request">
        <Button
          sx={{ background: "#FB641B", color: "white" }}
          variant="contained"
        >
          Request Service
        </Button>
      </Link>
      <Link to="/status/:requestId">
        <Button
          sx={{ background: "#FB641B", color: "white" }}
          variant="contained"
        >
          Service Status
        </Button>
      </Link>
      <Link to="/admin">
        <Button
          sx={{ background: "#FB641B", color: "white" }}
          variant="contained"
        >
          Admin Panel
        </Button>
      </Link>
    </Box>
  );
}
