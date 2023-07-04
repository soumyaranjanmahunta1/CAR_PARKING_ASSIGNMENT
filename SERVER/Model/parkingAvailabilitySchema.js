import mongoose from "mongoose";

const ParkingAvailabilitySchema = new mongoose.Schema({
  place: String,
  slots: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  vehicleType: String,
  price: Number,
  duration: String,
});

const ParkingModel = mongoose.model(
  "ParkingAvailability",
  ParkingAvailabilitySchema
);
export default ParkingModel;
