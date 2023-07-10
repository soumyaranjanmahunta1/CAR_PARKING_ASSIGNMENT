import axios from "axios";
const URL = "https://parkingwebsite.onrender.com";
export const authenticateSignup = async (data, { setsignerror }) => {
  try {
    console.log(data);
    const response = await axios.post(`${URL}/signup`, data);
    setsignerror(false);
    return response;
  } catch (err) {
    setsignerror(true);
    console.log("error while calling signup api is:-", err.message);
  }
};

export const authenticateLogin = async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data);
    return response;
  } catch (err) {
    console.log("error while calling login api is:-", err.message);
  }
};
