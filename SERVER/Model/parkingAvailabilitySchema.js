import mongoose from "mongoose";

const ParkingAvailabilitySchema = new mongoose.Schema({
  parkingPlace: String,
  slots: Number,
  vehicleType: String,
  price: Number,
  duration: Number,
});

const ParkingModel = mongoose.model(
  "ParkingAvailability",
  ParkingAvailabilitySchema
);
export default ParkingModel;
