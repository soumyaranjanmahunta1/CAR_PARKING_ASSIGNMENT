import React, { useState } from "react";
import { Dialog, Box, TextField, Typography, Button } from "@mui/material";
import { authenticateSignup, authenticateLogin } from "../../../Server/api";
import { useContext } from "react";
import { DataContext } from "../../../Context/DataProvider";
const initialValue = {
  login: {
    view: "login",
    heading: "Login",
    subheading: "Get access to Enjoy all features of this App",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here!",
    subheading: "Sign up with your mobile number to get started",
  },
};
const signupinitialval = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};
const initialloginData = {
  username: "",
  password: "",
};
export default function LoginDialog({ open, setOpen }) {
  const { setAccount } = useContext(DataContext);
  const [error, showError] = useState(false);
  const [signerror, setsignerror] = useState(false);
  const [signup, setSignup] = useState(signupinitialval);
  const [account, toggleAcount] = useState(initialValue.login);
  const [login, setLogin] = useState(initialloginData);
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(login);
  };
  const loginuser = async () => {
    let response = await authenticateLogin(login);
    if (!response) showError(true);
    else {
      showError(false);
      Handellclose();
      setAccount(response.data.data.firstname);
    }
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const signUpUser = async () => {
    
    let response = await authenticateSignup(signup, {setsignerror});
    if (!response) {
      return;
    }
    Handellclose();
    setAccount(signup.firstname);
  };
  const handelExistAcc = () => {
    toggleAcount(initialValue.login);
  };
  const Handellclose = () => {
    setOpen(false);
    toggleAcount(initialValue.login);
  };
  const switchtoSignup = () => {
    toggleAcount(initialValue.signup);
  };
  return (
    <Dialog
      open={open}
      onClose={Handellclose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <Box sx={{ height: "78vh", width: "100vh" }}>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box
            sx={{
              background:
                "#2874f0 no-repeat center 100% url(https://i.gifer.com/4jwo.gif)",
              height: "82%",
              width: "30%",
              padding: "46px 30px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#ffffff", fontWeight: "600" }}
            >
              {account.heading}
            </Typography>
            <Typography sx={{ marginTop: "20px", color: "#ffffff" }}>
              {account.subheading}
            </Typography>
          </Box>
          {account.view === "login" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "25px 35px",
              }}
            >
              <TextField
                variant="standard"
                label="Enter username"
                onChange={(e) => onValueChange(e)}
                name="username"
              />
              {error ? (
                <Typography sx={{ fontSize: "12px", color: "red" }}>
                  Please enter valid username or password
                </Typography>
              ) : (
                ""
              )}
              <TextField
                variant="standard"
                label="Enter Password"
                onChange={(e) => onValueChange(e)}
                name="password"
              />
              <Typography
                sx={{ marginTop: "20px", fontSize: "12px", color: "#878787" }}
              >
                By continuing, you agree to Parking App Terms of Use and Privacy
                Policy.
              </Typography>
              <Button
                sx={{
                  marginTop: "20px",
                  background: "#FB641B",
                  textTransform: "none",
                  color: "#fff",
                  height: "48px",
                  borderRadius: "2px",
                  fontWeight: "600",
                }}
                onClick={loginuser}
              >
                Login
              </Button>
              <Typography
                sx={{
                  marginTop: "200px",
                  fontSize: "14px",
                  textAlign: "center",
                  color: "#2874f0",
                  fontWeight: "550",
                  cursor: "pointer",
                }}
                onClick={switchtoSignup}
              >
                New to Parking App? Create an account
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "25px 35px",
              }}
            >
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="firstname"
                label="Enter Firstname"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="lastname"
                label="Enter Lastname"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="username"
                label="Enter Username"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="email"
                label="Enter Email"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Enter Password"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="phone"
                label="Enter Phone"
              />
              {signerror ? (
                <Typography sx={{ fontSize: "12px", color: "red",marginTop:"8px",marginBottom:"-13px" }}>
                  Please Enter valid Details with unique Email and UserName
                </Typography>
              ) : (
                ""
              )}
              <Typography
                sx={{ marginTop: "20px", fontSize: "12px", color: "#878787" }}
              >
                By continuing, you agree to Parking App Terms of Use and Privacy
                Policy.
              </Typography>
              <Button
                sx={{
                  marginTop: "20px",
                  background: "#FB641B",
                  textTransform: "none",
                  color: "#fff",
                  height: "48px",
                  borderRadius: "2px",
                  fontWeight: "600",
                }}
                onClick={signUpUser}
              >
                CONTINUE
              </Button>
              <Button
                sx={{
                  marginTop: "20px",
                  textTransform: "none",
                  color: "#2874f0",
                  height: "48px",
                  borderRadius: "2px",
                  boxShadow: "0 2px 2px 2px #E5E5E5",
                  fontWeight: "600",
                }}
                onClick={handelExistAcc}
              >
                Existing User? Log in
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
