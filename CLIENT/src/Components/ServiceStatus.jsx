import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../Context/DataProvider";
import { Typography } from "@mui/material";
export default function ServiceStatus() {
  const [paymentData, setpaymentData] = useState([]);
  const { account } = useContext(DataContext);
  const URL = "https://parkingwebsite.onrender.com";
  useEffect(() => {
    axios
      .get(`${URL}/getpayment?firstname=${account}`)
      .then((response) => {
        setpaymentData(response.data);
        console.log(paymentData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [account]);
  return account ? (
    <>
      {paymentData.map((el, id) => {
        return (
          <Box key={id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#8CD0EF",
                padding: "20px",
                borderRadius: "50px",
                marginTop: "20px",
              }}
            >
              <Box sx={{ padding: "50px" }}>
                <Typography
                  sx={{ color: "black", padding: "5px", fontFamily: "serif" }}
                >
                  Name : {account}
                </Typography>
                <Typography
                  sx={{ color: "black", padding: "5px", fontFamily: "serif" }}
                >
                  Parking Place : {el.parkingPlace}
                </Typography>
                <Typography
                  sx={{ color: "black", padding: "5px", fontFamily: "serif" }}
                >
                  Vehicle Type : {el.vehicleType}
                </Typography>
                <Typography
                  sx={{ color: "black", padding: "5px", fontFamily: "serif" }}
                >
                  Slot : {el.slots}
                </Typography>
                <Typography
                  sx={{ color: "black", padding: "5px", fontFamily: "serif" }}
                >
                  Amount to Pay : {el.price}
                </Typography>
              </Box>
              <Box>
                <img
                  style={{ width: "30%" }}
                  src="https://www.pngall.com/wp-content/uploads/13/Successful-No-Background.png"
                  alt=""
                />
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  ) : (
    <Box>
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <img
          style={{ width: "40%" }}
          src="https://cdnl.iconscout.com/lottie/premium/thumb/account-access-5611687-4682462.gif"
          alt=""
        />
      </Box>
      <Box>
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
    </Box>
  );
}
