import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  parkingPlace: String,
  slots: Number,
  vehicleType: String,
  price: Number,
});

const paymentModel = mongoose.model("paymentdetail", paymentSchema);
export default paymentModel;