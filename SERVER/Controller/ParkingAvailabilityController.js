import ParkingModel from "../Model/parkingAvailabilitySchema.js";

export const getParkingAvailability = (req, res) => {
     ParkingModel.find({})
       .then((availability) => {
         res.status(200).json(availability);
       })
       .catch((err) => {
         console.error(err);
         res.status(500).json({ error: "Internal server error" });
       });
};

export const deleteServiceData = async(req,res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const result = await ParkingModel.findByIdAndDelete(id);
     if (!result) {
      // If no data found with the provided ID
      return res.status(404).json({ message: 'Data not found' });
    }

    return res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
     console.log('Error deleting data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const createServiceRequest = async(req, res) => {
  const exist = await ParkingModel.findOne({ slots: req.body.slots });
    if (exist) {
      return res.status(401).json({ message: "solt is not avalable right now" });
    }
     const { place, slots, vehicleType, price, duration } = req.body;

     const newAvailability = new ParkingModel({
       place,
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
         res.status(500).json({ error: "Internal server error" });
       });
};


