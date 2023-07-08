import ParkingModel from "../Model/parkingAvailabilitySchema.js";
const requestService = async(req, res) => {
  let { parkingPlace, slots, vehicleType } = req.query;
  slots = parseInt(slots);;
  try {
     const fillData = await ParkingModel.aggregate([
       {
         $match: {
           parkingPlace: parkingPlace,
           $expr: { $gte: ["$slots", slots] },
           vehicleType: vehicleType,
         },
       },
     ]);
    res.status(200).json(fillData);
  } catch (err) {
    res.status(500).json(err);
   }
  
};
export default requestService;
