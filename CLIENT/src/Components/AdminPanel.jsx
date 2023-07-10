import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../Context/DataProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const initialservicedata = {
  parkingPlace: "",
  slots: 1,
  vehicleType: "",
  price: 1,
  duration: 0,
};

export default function AdminPanel() {
  const { panelist, setpanelist } = useContext(DataContext);
  const [serviceData, setserviceData] = useState(initialservicedata);
  const navigate = useNavigate();
  const [error, seterror] = useState(false);
  const onInputChange = (e) => {
    setserviceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const parkingPlaceData = async () => {
    console.log(serviceData);
    const URL = "https://parkingwebsite.onrender.com";
    try {
      const response = await axios.post(`${URL}/parkingPlaces`, serviceData);
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
    <Box sx={{ marginTop: "15px" }}>
      {panelist == "Admin" ? (
        <Box
          sx={{
            marginTop: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "25px 5px",
          }}
        >
          <FormControl fullWidth sx={{ marginLeft: "59%" }}>
            <InputLabel id="demo-simple-select-label">Place</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              name="parkingPlace"
              onChange={(e) => onInputChange(e)}
              label="Age"
              sx={{ width: "41%", marginTop: "10px", background: "#E4E5E7" }}
            >
              <MenuItem value={"Hospital"}>Hospital</MenuItem>
              <MenuItem value={"Air port"}>Air port</MenuItem>
              <MenuItem value={"Railway Stations"}>Railway Stations</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="standard-basic"
            label="Enter Number of Slots"
            variant="outlined"
            name="slots"
            onChange={(e) => onInputChange(e)}
            sx={{ width: "41%", marginTop: "10px", background: "#E4E5E7" }}
          />
          <FormControl fullWidth sx={{ marginLeft: "59%" }}>
            <InputLabel id="demo-simple-select-label">vehicleType</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              name="vehicleType"
              onChange={(e) => onInputChange(e)}
              label="Age"
              sx={{ width: "41%", marginTop: "10px", background: "#E4E5E7" }}
            >
              <MenuItem value={"Bike"}>Bike</MenuItem>
              <MenuItem value={"Car"}>Car</MenuItem>
              <MenuItem value={"Bus"}>Bus</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="standard-basic"
            label="Enter Your Price"
            variant="outlined"
            name="price"
            onChange={(e) => onInputChange(e)}
            sx={{ width: "41%", marginTop: "10px", background: "#E4E5E7" }}
          />
          <TextField
            id="standard-basic"
            label="Enter Your Duration"
            variant="outlined"
            name="duration"
            onChange={(e) => onInputChange(e)}
            sx={{ width: "41%", marginTop: "10px", background: "#E4E5E7" }}
          />
          <Button
            variant="contained"
            sx={{
              background: "#2874F0",
              color: "white",
              width: "41%",
              marginTop: "9px",
            }}
            onClick={parkingPlaceData}
          >
            ADD YOUR PLACE
          </Button>
        </Box>
      ) : (
        <Box
          variant="h4"
          sx={{
            color: "red",
            textAlign: "center",
            marginTop: "-10%",
            width: "100%",
          }}
        >
          <img
            style={{ width: "50%", padding: "20px" }}
            src="https://rurutek.com/jio/assets/img/login-animate.gif"
            alt=""
          />
          <Typography
            variant="h3"
            sx={{
              marginTop: "-10%",
              fontFamily: "safari",
              color: "#263238",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            Only{" "}
            <span
              style={{ color: "#407BFF", fontWeight: "900", fontSize: "40px" }}
            >
              ADMIN
            </span>{" "}
            Can Acces
          </Typography>
        </Box>
      )}
    </Box>
  );
}
