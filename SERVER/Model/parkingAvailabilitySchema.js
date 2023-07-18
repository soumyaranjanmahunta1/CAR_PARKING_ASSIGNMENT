import mongoose from "mongoose";

const ParkingAvailabilitySchema = new mongoose.Schema({
  parkingPlace: String,
  slots: {
    type: Number,
    required: true,
  },
  vehicleType: String,
  price: Number,
  duration: Number,
});
const ParkingModel = mongoose.model(
  "ParkingAvailability",
  ParkingAvailabilitySchema
);
export default ParkingModel;
