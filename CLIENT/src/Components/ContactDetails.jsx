import { Box, Button, TextField, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
const initialvalue = {
  Email: "",
  Mobile: "",
  Query: "",
};
export default function ContactDetails() {
  const theme = useTheme();
  const [detailData, setdetailData] = useState(initialvalue);
  const navigate = useNavigate();
  const [error, seterror] = useState(false);
  const [success, setSuccess] = useState(false);
  const [valid, setvalid] = useState("");
  const onInputChange = (e) => {
    setdetailData({ ...detailData, [e.target.name]: e.target.value });
  };
  const URL = "http://localhost:8000";
  const SubmitmyQuery = async () => {
    if (!detailData.Email) {
      setvalid("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(detailData.Email)) {
      setvalid("Invalid email format");
    } else if (!detailData.Mobile) {
      setvalid("Phone is required");
    } else if (detailData.Mobile.length !== 10) {
      setvalid("Phone number must be 10 digits long");
    } else if (!detailData.Query) {
      setvalid("Query is required");
    } else {
      try {
        const response = await axios.post(`${URL}/contactDetails`, detailData);
        if (response) {
          seterror(false);
          setSuccess(true);
        }
      } catch (err) {
        seterror(true);
        console.log("error while calling  api is:-", err.message);
      }
    }
  };

  const Image = styled("img")({
    [theme.breakpoints.down("md")]: {
      marginLeft: "-60px",
    },
  });
  return success ? (
    <Box sx={{ display: "grid", justifyContent: "center" }}>
      <Box>
        <img
          src="https://cdnl.iconscout.com/lottie/premium/thumb/successfully-done-5627021-4699001.gif"
          alt=""
        />
      </Box>
      <Box sx={{ marginTop: "-15px" }}>
        <Typography variant="h5" sx={{ fontSize: "100%", textAlign: "center" }}>
          Your Query Noted we will connect with you soon ...
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        marginTop: "50px",
        height: "100%",
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "grid",
        },
      }}
    >
      <Box
        sx={{
          width: "60%",
          marginTop: "-150px",
        }}
      >
        <Image
          src="https://thecapplug.com/img/cms/94599-contact-us.gif"
          alt="img"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          [theme.breakpoints.down("md")]: {
            marginTop: "-180px",
            padding: "50px",
          },
        }}
      >
        <TextField
          id="standard-basic"
          label="Enter Your Email"
          variant="standard"
          type="email"
          name="Email"
          onChange={(e) => onInputChange(e)}
          sx={{ width: "50%", marginTop: "10px" }}
        />
        <TextField
          id="standard-basic"
          label="Enter Mobile Number"
          variant="standard"
          name="Mobile"
          onChange={(e) => onInputChange(e)}
          sx={{ width: "50%", marginTop: "10px" }}
        />
        <TextField
          id="standard-basic"
          label="Add Your Query"
          variant="outlined"
          name="Query"
          onChange={(e) => onInputChange(e)}
          sx={{
            width: "70%",
            marginTop: "10px",
            height: "100px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
          }}
        />
        <Box sx={{ width: "100%", height: "100%" }}>
          {valid ? (
            <Typography
              sx={{
                color: "red",
                fontSize: "13px",
                padding: "2px",
              }}
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
              width: "40%",
              height: "15%",
              [theme.breakpoints.down("md")]: {
                height: "55%",
                marginTop: "10px",
              },
            }}
            onClick={SubmitmyQuery}
          >
            Submit Query
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
