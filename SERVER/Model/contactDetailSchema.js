import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 20,
  },
  Mobile: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 10,
  },
  Query: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 200,
  },
});
const contactModel = mongoose.model("contactDetails", contactSchema);
    export default contactModel;