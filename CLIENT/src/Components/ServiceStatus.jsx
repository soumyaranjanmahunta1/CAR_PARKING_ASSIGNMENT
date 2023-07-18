import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../Context/DataProvider";
import { Typography } from "@mui/material";
export default function ServiceStatus() {
  const [paymentData, setpaymentData] = useState([]);
  const { account } = useContext(DataContext);
  const URL = "http://localhost:8000";
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
      {paymentData.length == 0 ? (
        <Box sx={{ width: "100%", marginTop: "-5%", textAlign: "center" }}>
          <img
            style={{ width: "50%" }}
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=2000"
            alt=""
          />
          <Typography
            variant="h3"
            sx={{
              marginTop: "-8%",
              fontFamily: "safari",
              color: "#263238",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            You Haven't{" "}
            <span
              style={{
                color: "#407BFF",
                fontWeight: "900",
                fontSize: "36px",
                fontFamily: "safari",
              }}
            >
              BOOKED{" "}
            </span>
            Yet
          </Typography>
        </Box>
      ) : (
        <Box>
          {paymentData.map((el, id) => {
            return (
              <Box key={id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgb(89,204,115)",
                    padding: "20px",
                    borderRadius: "50px",
                    marginTop: "20px",

                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset,rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                  }}
                >
                  <Box sx={{ padding: "50px" }}>
                    <Typography
                      sx={{
                        color: "black",
                        padding: "5px",
                        fontFamily: "serif",
                      }}
                    >
                      User Name : {account}
                    </Typography>
                    <Typography
                      sx={{
                        color: "black",
                        padding: "5px",
                        fontFamily: "serif",
                      }}
                    >
                      Parking Place : {el.parkingPlace}
                    </Typography>
                    <Typography
                      sx={{
                        color: "black",
                        padding: "5px",
                        fontFamily: "serif",
                      }}
                    >
                      Vehicle Type : {el.vehicleType}
                    </Typography>
                    <Typography
                      sx={{
                        color: "black",
                        padding: "5px",
                        fontFamily: "serif",
                      }}
                    >
                      Slot : {el.slots}
                    </Typography>
                    <Typography
                      sx={{
                        color: "black",
                        padding: "5px",
                        fontFamily: "serif",
                      }}
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
        </Box>
      )}
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
