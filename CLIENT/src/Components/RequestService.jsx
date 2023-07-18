import {
  Box,
  Button,
  SliderThumb,
  TextField,
  Typography,
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
import styled from "@emotion/styled";
const initialData = {
  parkingPlace: "",
  slots: 0,
  vehicleType: "",
};

const paymentinitialData = {
  firstname: "",
  parkingPlace: "",
  slots: 0,
  vehicleType: "",
  price: 0,
};

export default function RequestService() {
  const { account, seAccount } = useContext(DataContext);
  const [show, setshow] = useState(true);
  const [otpinp, setotpinp] = useState("");
  const [err, seterr] = useState("");
  const [data, setdata] = useState({});
  const [requestData, setrequestData] = useState(initialData);
  const [otp, setotp] = useState(false);
  const [success, setsuccess] = useState(false);
  const [payment, setpayment] = useState(paymentinitialData);
  const [otpvalid, setotpvalid] = useState("");
  const [myotp, setmyotp] = useState("");
  const navigate = useNavigate();
  const onInputChange = (e) => {
    setrequestData({ ...requestData, [e.target.name]: e.target.value });
  };

  const parkingPlaceData = async () => {
    const URL = "http://localhost:8000";

    if (requestData.parkingPlace == "") {
      seterr("You need to fill the Parking Place");
    } else if (requestData.vehicleType == "") {
      seterr("You need to fill the Vehicle Type");
    } else if (requestData.slots == "") {
      seterr("You need to fill the Slots");
    } else {
      try {
        const response = await axios.get(
          `${URL}/requestService?parkingPlace=${requestData.parkingPlace}&vehicleType=${requestData.vehicleType}&slots=${requestData.slots}`
        );
        if (response.data && response.data.length > 0) {
          setdata(response.data[0]);
          setshow(false);
          seterr("");
        } else if (err == "") {
          seterr("No Such Places or Slots are Avalable right Now");
        }
      } catch (err) {
        console.log("error while calling  api is:-", err.message);
      }
    }
  };

  const submitPaymentRequest = () => {
    setotp(true);
    setpayment({
      firstname: account,
      parkingPlace: data.parkingPlace,
      slots: requestData.slots,
      vehicleType: data.vehicleType,
      price: data.price * requestData.slots,
    });

    const min = 100000; // Minimum value of the 6-digit number (inclusive)
    const max = 999999; // Maximum value of the 6-digit number (inclusive)

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setmyotp(randomNumber);
    setTimeout(() => {
      alert(
        `We have received a payment request for [Parking App] from your account. To ensure the security of your transaction, we require an OTP (One-Time Password) verification. Please find below your OTP details:OTP: ${randomNumber}`
      );
    }, 2000);
  };
  const ResendOtp = () => {
    const min = 100000; // Minimum value of the 6-digit number (inclusive)
    const max = 999999; // Maximum value of the 6-digit number (inclusive)

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setmyotp(randomNumber);
    setTimeout(() => {
      alert(
        `We have received a payment request for [Parking App] from your account. To ensure the security of your transaction, we require an OTP (One-Time Password) verification. Please find below your OTP details:OTP: ${randomNumber}`
      );
    }, 2000);
  };

  const otpsubmit = async () => {
    if (otpinp == myotp) {
      const URL = "http://localhost:8000";
      try {
        const response = await axios.post(`${URL}/payment`, payment);
        if (response) {
          setotpvalid("");
        }
        await axios.put(`${URL}/updateParkingSlots`, requestData);
      } catch (err) {
        console.log("error while calling  api is:-", err.message);
      }
      setsuccess(true);
    } else {
      setotpvalid("Invalid OTP");
    }
  };

  const onOtpChange = (e) => {
    setotpinp(e.target.value);
  };
  const theme = useTheme();
  const Image = styled("img")({
    [theme.breakpoints.down("lg")]: {
      width: "450px",
      marginBottom:"13px"
    },
  });
  return (
    <>
      {account ? (
        show ? (
          <Box sx={{ marginTop: "15px" }}>
            <Box
              sx={{
                textAlign: "center",
                marginTop: "-40px",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              <Image
                src="https://www.shutterstock.com/image-vector/india-architecture-landmarks-skyline-shape-260nw-692394217.jpg"
                alt=""
              />
            </Box>
            <Box
              sx={{
                marginTop: "-110px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "25px 5px",
              }}
            >
              <FormControl
                fullWidth
                sx={{ marginLeft: "59%", background: "white" }}
              >
                <InputLabel id="demo-simple-select-label">Place</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="parkingPlace"
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
                  <MenuItem value={"Railway Stations"}>
                    Railway Stations
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="standard-basic"
                label="Enter Number of Slots"
                variant="outlined"
                name="slots"
                type="number"
                onChange={(e) => onInputChange(e)}
                sx={{
                  width: "41%",
                  marginTop: "10px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                }}
              />
              <FormControl fullWidth sx={{ marginLeft: "59%" }}>
                <InputLabel id="demo-simple-select-label">
                  vehicleType
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
              {err ? (
                <Typography
                  sx={{ color: "red", fontSize: "13px", padding: "0px" }}
                >
                  {err}
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
                ADD YOUR Request
              </Button>
            </Box>
          </Box>
        ) : success ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif"
              alt=""
              style={{ width: "60%" }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: "15px",
                background: "#002023",
                height: "300px",
                marginTop: "35px",
                width: "800px",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{ color: "white", padding: "12px", fontFamily: "serif" }}
                >
                  Payment Getway
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box style={{ width: "50%" }}>
                  <img
                    src="https://media.giphy.com/media/EopV0wKH3USE9F7fhe/giphy.gif"
                    alt=""
                    style={{ width: "50%" }}
                  />
                </Box>
                <Box style={{ width: "50%" }}>
                  {otp ? (
                    <Box
                      sx={{
                        Display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <TextField
                        label="Enter OTP"
                        sx={{
                          background: "white",
                          marginRight: "10px",
                          borderRadius: "30px",
                        }}
                        onChange={(e) => onOtpChange(e)}
                      />
                      <Button
                        sx={{
                          color: "black",
                          background: "white",
                          width: "150px",
                          marginTop: "13px",
                          height: "30px",
                          fontWeight: "900",
                          borderRadius: "30px",
                        }}
                        onClick={otpsubmit}
                      >
                        Submit
                      </Button>
                      <Typography
                        sx={{
                          color: "blue",
                          marginLeft: "10px",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                        onClick={ResendOtp}
                      >
                        Resend OTP
                      </Typography>
                      <Typography
                        sx={{
                          color: "red",
                          marginLeft: "19px",
                          padding: "0px",
                          cursor: "pointer",
                        }}
                      >
                        {otpvalid}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          color: "white",
                          padding: "5px",
                          fontFamily: "serif",
                        }}
                      >
                        User Name : {account}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          padding: "5px",
                          fontFamily: "serif",
                        }}
                      >
                        Parking Place : {data.parkingPlace}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          padding: "5px",
                          fontFamily: "serif",
                        }}
                      >
                        Vehicle Type : {data.vehicleType}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          padding: "5px",
                          fontFamily: "serif",
                        }}
                      >
                        Slot : {requestData.slots}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          padding: "5px",
                          fontFamily: "serif",
                        }}
                      >
                        Amount to Pay : {data.price * requestData.slots}
                      </Typography>
                      <Button
                        sx={{
                          color: "black",
                          background: "white",
                          width: "150px",
                          marginTop: "7px",
                          height: "30px",
                          fontWeight: "900",
                        }}
                        onClick={submitPaymentRequest}
                      >
                        Pay
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )
      ) : (
        <Box>
          <Box sx={{ padding: "10px" }}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                color: "#263238",
                fontFamily: "serif",
                fontSize: "30px",
              }}
            >
              You Need to &nbsp;
              <span
                style={{
                  color: "#407BFF",
                  fontWeight: "900",
                  fontSize: "40px",
                }}
              >
                LOGIN
              </span>
              &nbsp; first
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <img
              style={{ width: "50%" }}
              src="https://cdn.dribbble.com/users/669537/screenshots/5821620/dribbble-clip800x600_2.gif"
              alt=""
            />
          </Box>
        </Box>
      )}
    </>
  );
}
