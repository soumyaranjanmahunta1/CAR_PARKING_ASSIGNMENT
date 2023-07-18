import ParkingModel from "../Model/parkingAvailabilitySchema.js";

const updateParkingSlots = async (req, res) => {
  let { parkingPlace, slots, vehicleType } = req.body;
  slots = parseInt(slots);
  try {
    const fillData = await ParkingModel.findOneAndUpdate(
      {
        parkingPlace: parkingPlace,
        $expr: { $gte: ["$slots", slots] },
        vehicleType: vehicleType,
      },
      { $inc: { slots: -slots } }, // Decrement slots by the requested number
      { new: true } // Return the updated document
    );

    res.status(200).json(fillData);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default updateParkingSlots;
