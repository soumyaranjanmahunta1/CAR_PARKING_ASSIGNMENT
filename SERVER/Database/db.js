import mongoose from "mongoose";
const URL = `mongodb+srv://happysoumya3:1234@cluster0.wyc5ihb.mongodb.net/?retryWrites=true&w=majority`;
const connection = () => {
    try {
        mongoose.connect(URL);
        console.log("mongoose connect sucessfully");
    } catch (error) {
        console.log(error);
    }    
}
export default connection;
