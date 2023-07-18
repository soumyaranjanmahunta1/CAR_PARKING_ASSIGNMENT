import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Dialog,
  Box,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
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
  fullname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  role: "",
};
const initialloginData = {
  username: "",
  password: "",
};
export default function LoginDialog({ open, setOpen }) {
  const { setAccount } = useContext(DataContext);
  const { panelist, setpanelist } = useContext(DataContext);
  const [error, showError] = useState(false);
  const [signerror, setsignerror] = useState(false);
  const [signup, setSignup] = useState(signupinitialval);
  const [account, toggleAcount] = useState(initialValue.login);
  const [login, setLogin] = useState(initialloginData);
  const [type, settype] = useState("password");
  const [valid, setvalid] = useState("");
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const loginuser = async () => {
    let response = await authenticateLogin(login);
    if (!response) showError(true);
    else {
      showError(false);
      Handellclose();
      setAccount(response.data.data.username);
      setpanelist(response.data.data.role);
    }
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const onSelectChange = (e) => {
    setSignup({ ...signup, role: e.target.value });
  };
  const signUpUser = async () => {
    if (!signup.fullname) {
      setvalid("Fullname is required");
    } else if (!/^(?:[A-Z][a-z]*\s+)+[A-Z][a-z]*$/.test(signup.fullname)) {
      setvalid(
        "Please enter a valid full name with the first letter of each word capitalized"
      );
    } else if (!signup.username) {
      setvalid("Username is required");
    } else if (!signup.email) {
      setvalid("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(signup.email)) {
      setvalid("Invalid email format");
    } else if (!signup.password) {
      setvalid("Password is required");
    } else if (!signup.phone) {
      setvalid("Phone is required");
    } else if (signup.phone.length !== 10) {
      setvalid("Phone number must be 10 digits long");
    } else if (!signup.role) {
      setvalid("Role is required");
    } else {
      setvalid("");
    }
    console.log("x");
    let response = await authenticateSignup(signup, { setsignerror });
    console.log(response);
    if (!response) {
      return;
    }
    Handellclose();
    console.log(response);
    setAccount(signup.username);
    setpanelist(signup.role);
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

  const changeType = () => {
    if (type == "password") {
      settype("text");
    } else {
      settype("password");
    }
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
                type="text"
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

              <Box sx={{ display: "flex" }}>
                <TextField
                  variant="standard"
                  onChange={(e) => onValueChange(e)}
                  name="password"
                  type={type}
                  label="Enter Password"
                  sx={{ width: "100%" }}
                />
                {type == "password" ? (
                  <VisibilityOffIcon
                    onClick={changeType}
                    sx={{ marginTop: "10px" }}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={changeType}
                    sx={{ marginTop: "10px" }}
                  />
                )}
              </Box>
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
                name="fullname"
                label="Enter Your Fullname"
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
                type="email"
                name="email"
                label="Enter Email"
              />
              <Box sx={{ display: "flex" }}>
                <TextField
                  variant="standard"
                  onChange={(e) => onInputChange(e)}
                  name="password"
                  type={type}
                  label="Enter Password"
                  sx={{ width: "100%" }}
                />
                {type == "password" ? (
                  <VisibilityOffIcon
                    onClick={changeType}
                    sx={{ marginTop: "10px" }}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={changeType}
                    sx={{ marginTop: "10px" }}
                  />
                )}
              </Box>

              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="phone"
                type="number"
                label="Enter Phone"
              />
              <FormControl fullWidth sx={{ marginTop: "7px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  onChange={(e) => onSelectChange(e)}
                  label="Select Role"
                  variant="standard"
                  sx={{ height: "50px", marginTop: "6px" }}
                >
                  <MenuItem value={"User"}>User</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
              {valid ? (
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "8px",
                    marginBottom: "-13px",
                  }}
                >
                  {valid}
                </Typography>
              ) : (
                ""
              )}
              {valid == "" && signerror ? (
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "8px",
                    marginBottom: "-13px",
                  }}
                >
                  Please Enter unique Email and UserName
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
