import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const initialservicedata = {
  place: "",
  slots: 1,
  vehicleType: "",
  price: 1,
  duration: "",
};
export default function BookSlot() {
  const [serviceData, setserviceData] = useState(initialservicedata);
  const navigate = useNavigate();
  const [error, seterror] = useState(false);
  const onInputChange = (e) => {
    setserviceData({ ...serviceData, [e.target.name]: e.target.value });
    
  };
  const sendServiceData = async () => {
    const URL = "http://localhost:8000";
    try {
      const response = await axios.post(`${URL}/servicerequest`, serviceData);
      if (response) {
        seterror(false);
        navigate("/");
      }
    } catch (err) {
      seterror(true);
      console.log("error while calling  api is:-", err.message);
    }
  };
  return (
    <Box
      sx={{
        marginTop: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "25px 5px",
      }}
    >
      <TextField
        id="standard-basic"
        label="Enter Your Place Name"
        variant="outlined"
        name="place"
        onChange={(e) => onInputChange(e)}
        sx={{ width: "41%", marginTop: "10px" }}
      />
      <TextField
        id="standard-basic"
        label="Enter Your Slot"
        variant="outlined"
        name="slots"
        onChange={(e) => onInputChange(e)}
        sx={{ width: "41%", marginTop: "10px" }}
      />
      {error ? (
        <Typography
          sx={{
            fontSize: "13px",
            color: "red",
            marginLeft: "-350px",
            padding: "2px",
          }}
        >
          This slot is not avalable right Now
        </Typography>
      ) : (
        ""
      )}
      <TextField
        id="standard-basic"
        label="Enter Your VehicleType"
        variant="outlined"
        name="vehicleType"
        onChange={(e) => onInputChange(e)}
        sx={{ width: "41%", marginTop: "10px" }}
      />
      <TextField
        id="standard-basic"
        label="Enter Your Price"
        variant="outlined"
        name="price"
        onChange={(e) => onInputChange(e)}
        sx={{ width: "41%", marginTop: "10px" }}
      />
      <TextField
        id="standard-basic"
        label="Enter Your Duration"
        variant="outlined"
        name="duration"
        onChange={(e) => onInputChange(e)}
        sx={{ width: "41%", marginTop: "10px" }}
      />
      <Button
        sx={{
          background: "#2874F0",
          color: "white",
          width: "41%",
          marginTop: "9px",
        }}
        onClick={sendServiceData}
      >
        ADD YOUR SLOT
      </Button>
    </Box>
  );
}
