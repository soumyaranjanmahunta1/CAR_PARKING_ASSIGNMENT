import ParkingModel from "../Model/parkingAvailabilitySchema.js";

export const getParkingPlaceData = (req, res) => {
  ParkingModel.find({})
    .then((availability) => {
      res.status(200).json(availability);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

