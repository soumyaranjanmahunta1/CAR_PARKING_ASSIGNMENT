
import ParkingModel from "../Model/parkingAvailabilitySchema.js";
export const AddtoParkingPlace = async (req, res) => {
  const { parkingPlace, slots, vehicleType, price, duration } = req.body;

  const newAvailability = new ParkingModel({
    parkingPlace,
    slots,
    vehicleType,
    price,
    duration,
  });

  newAvailability
    .save()
    .then((savedAvailability) => {
      res.status(201).json(savedAvailability);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

