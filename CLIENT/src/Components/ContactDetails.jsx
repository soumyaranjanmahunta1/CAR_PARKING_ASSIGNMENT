import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const initialvalue = {
  Email: "",
  Mobile: "",
  Query:"",
}
export default function ContactDetails() {
  const [detailData, setdetailData] = useState(initialvalue);
    const navigate = useNavigate();
    const [error, seterror] = useState(false);
    const [success, setSuccess] = useState(false);
  const onInputChange = (e) => {
    setdetailData({ ...detailData, [e.target.name]: e.target.value });
  }
const URL = "http://localhost:8000";
  const SubmitmyQuery = async() => {
     try {
      const response = await axios.post(`${URL}/contactDetails`, detailData);
      if (response) {
        seterror(false);
        setSuccess(true)
       
      }
    } catch (err) {
      seterror(true);
      console.log("error while calling  api is:-", err.message);
    }
  }
  return success ? (
    <Box sx={{ display: "grid", justifyContent: "center" }}>
      <Box>
        <img
          src="https://cdnl.iconscout.com/lottie/premium/thumb/successfully-done-5627021-4699001.gif"
          alt=""
        />
      </Box>
      <Box sx={{marginTop:"-15px"}}>
        <Typography variant="h5" sx={{ fontSize: "100%", textAlign: "center" }}>
          Your Query Noted we will connect with you soon ...
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{ display: "flex", marginTop: "15px", height: "100%", width: "100%" }}
    >
      <Box sx={{ width: "50%" }}>
        <img
          src="https://baline.in/wp-content/uploads/2021/06/contact-us.gif"
          alt=""
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <TextField
          id="standard-basic"
          label="Enter Your Email"
          variant="standard"
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
          sx={{ width: "70%", marginTop: "10px", height: "100px" }}
        />
        <Button
          variant="contained"
          sx={{
            background: "#2874F0",
            color: "white",
            width: "40%",
            marginTop: "-20px",
            height: "15%",
          }}
          onClick={SubmitmyQuery}
        >
          Submit Query
        </Button>
      </Box>
    </Box>
  );
}
