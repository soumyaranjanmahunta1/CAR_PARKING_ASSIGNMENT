import { Box, Button, SliderThumb, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../Context/DataProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  price:0,
};

export default function RequestService() {
  const { account, seAccount } = useContext(DataContext);
  const [show, setshow] = useState(true);
  const [otpinp, setotpinp] = useState("");
  const [err, seterr] = useState(false);
  const [data, setdata] = useState({});
  const [requestData, setrequestData] = useState(initialData);
  const [otp, setotp] = useState(false);
  const [success, setsuccess] = useState(false);
  const [payment, setpayment] = useState(paymentinitialData);

  const navigate = useNavigate();
  const onInputChange = (e) => {
    setrequestData({ ...requestData, [e.target.name]: e.target.value });
  };

  const parkingPlaceData = async () => {
    const URL = "http://localhost:8000";
    try {
      const response = await axios.get(
        `${URL}/requestService?parkingPlace=${requestData.parkingPlace}&vehicleType=${requestData.vehicleType}&slots=${requestData.slots}`
      );
      if (response.data && response.data.length > 0) {
        setdata(response.data[0]);
        setshow(false);
        seterr(false);
      } else {
        seterr(true);
      }
    } catch (err) {
      console.log("error while calling  api is:-", err.message);
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
    alert("We have received a payment request for [Parking App] from your account. To ensure the security of your transaction, we require an OTP (One-Time Password) verification. Please find below your OTP details:OTP: 96257");
  };
  const ResendOtp = () => {
   alert(
     "We have received a payment request for [Parking App] from your account. To ensure the security of your transaction, we require an OTP (One-Time Password) verification. Please find below your OTP details:OTP: 96257"
   );
}
  
  const otpsubmit = async() => {
    if (otpinp == "96257") {
      const URL = "http://localhost:8000";
      try {
      console.log(payment)
      const response = await axios.post(`${URL}/payment`, payment);
      if (response) {
      
      }
    } catch (err) {
      console.log("error while calling  api is:-", err.message);
    }
      setsuccess(true);
    }
  }

  const onOtpChange = (e) => {
    setotpinp(e.target.value);
  }
  return account ? (
    show ? (
      <Box sx={{ marginTop: "15px" }}>
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
          {err ? (
            <Typography sx={{ color: "red", fontSize: "13px", padding: "0px" }}>
              {" "}
              No Such Places or Slots are Avalable right Now
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
      <Box sx={{display:"flex",justifyContent:"center"}}>
        <img
          src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif"
            alt=""
            style={{width:"60%"}}
        />
      </Box>
    ) : (
      <Box
        sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
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
                      <Typography sx={{color:"blue",marginLeft:"10px",padding:"10px",cursor:"pointer"}} onClick={ResendOtp}>Resend OTP</Typography>
                </Box>
              ) : (
                <>
                  <Typography
                    sx={{ color: "white", padding: "5px", fontFamily: "serif" }}
                  >
                    Name : {account}
                  </Typography>
                  <Typography
                    sx={{ color: "white", padding: "5px", fontFamily: "serif" }}
                  >
                    Parking Place : {data.parkingPlace}
                  </Typography>
                  <Typography
                    sx={{ color: "white", padding: "5px", fontFamily: "serif" }}
                  >
                    Vehicle Type : {data.vehicleType}
                  </Typography>
                  <Typography
                    sx={{ color: "white", padding: "5px", fontFamily: "serif" }}
                  >
                    Slot : {requestData.slots}
                  </Typography>
                  <Typography
                    sx={{ color: "white", padding: "5px", fontFamily: "serif" }}
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
            style={{ color: "#407BFF", fontWeight: "900", fontSize: "40px" }}
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
  );
}
