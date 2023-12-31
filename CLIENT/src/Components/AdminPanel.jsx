import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
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
  slots: 0,
  vehicleType: "",
  price: 0,
  duration: 0,
};

export default function AdminPanel() {
  const [valid, setvalid] = useState("");
  const { panelist, setpanelist } = useContext(DataContext);
  const [serviceData, setserviceData] = useState(initialservicedata);
  const navigate = useNavigate();
  const [error, seterror] = useState(false);
  const onInputChange = (e) => {
    setserviceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const parkingPlaceData = async () => {
    console.log(serviceData);
    const URL = "http://localhost:8000";
    if (serviceData.parkingPlace == "") {
      setvalid("You need to fill the Parking Place");
    } else if (serviceData.vehicleType == "") {
      setvalid("You need to fill the Vehicle Type");
    } else if (serviceData.slots == 0) {
      setvalid("You need to fill the slots");
    } else if (serviceData.duration == 0) {
      setvalid("You need to fill the Duration");
    } else if (serviceData.price == 0) {
      setvalid("You need to fill the Price");
    } else {
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
    }
  };
  const theme = useTheme();
  // const contentBox = styled(Box)(({ theme }) => ({
  // [theme.breakpoints.down("md")]: {
  //  padding:"200px",
  // },
  // }));
  return (
    <Box sx={{ marginTop: "15px", background: "#EEF9FF", height: "100%" }}>
      {panelist == "Admin" ? (
        <Box
          sx={{
            [theme.breakpoints.down("lg")]: {
              marginTop: "150px",
            },
          }}
        >
          <Box>
            <img
              src="https://printawallpaper.com/wp-content/uploads/2020/07/india_vector_detail.jpg"
              alt=""
              style={{
                width: "100%",
                marginTop: "-225px",
              }}
            />
          </Box>
          <Box
            sx={{
              marginTop: "-380px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "25px 5px",
              [theme.breakpoints.down("lg")]: {
                marginTop: "-150px",
              },
            }}
          >
            <FormControl fullWidth sx={{ marginLeft: "59%" }}>
              <InputLabel id="demo-simple-select-label">Place</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="parkingPlace"
                variant="outlined"
                onChange={(e) => onInputChange(e)}
                label="Age"
                sx={{
                  width: "41%",
                  marginTop: "10px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                }}
              >
                <MenuItem value={"Hospital"}>Hospital</MenuItem>
                <MenuItem value={"Air port"}>Air port</MenuItem>
                <MenuItem value={"Railway Stations"}>Railway Stations</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{ marginLeft: "59%", marginTop: "10px" }}
            >
              <InputLabel id="demo-simple-select-label">vehicleType</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                variant="outlined"
                name="vehicleType"
                onChange={(e) => onInputChange(e)}
                label="Age"
                sx={{
                  width: "41%",
                  marginTop: "10px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                }}
              >
                <MenuItem value={"Bike"}>Bike</MenuItem>
                <MenuItem value={"Car"}>Car</MenuItem>
                <MenuItem value={"Bus"}>Bus</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Enter Number of Slots"
              variant="outlined"
              type="number"
              name="slots"
              onChange={(e) => onInputChange(e)}
              sx={{
                width: "41%",
                marginTop: "10px",
                fontWeight: "900px",
                fontWeight: "700",
                color: "black",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
              }}
            />

            <TextField
              id="standard-basic"
              label="Enter Your Price"
              variant="outlined"
              type="number"
              name="price"
              onChange={(e) => onInputChange(e)}
              sx={{
                width: "41%",
                marginTop: "10px",
                fontWeight: "700",
                color: "black",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
              }}
            />
            <TextField
              id="standard-basic"
              label="Enter Your Duration"
              variant="outlined"
              type="number"
              name="duration"
              onChange={(e) => onInputChange(e)}
              sx={{
                width: "41%",
                marginTop: "10px",
                fontWeight: "700",
                color: "black",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
              }}
            />
            {valid ? (
              <Typography
                sx={{ color: "red", fontSize: "13px", padding: "0px" }}
              >
                {valid}
              </Typography>
            ) : (
              ""
            )}
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
