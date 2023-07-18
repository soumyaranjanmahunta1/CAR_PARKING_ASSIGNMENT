import paymentModel from "../Model/paymentSchema.js";

const paymentController = (req, res) => {
  const { parkingPlace, firstname, vehicleType, price, slots } = req.body;

  const newpayment = new paymentModel({
    parkingPlace,
    slots,
    vehicleType,
    price,
    firstname,
  });

  newpayment
    .save()
    .then((savedAvailability) => {
      res.status(201).json(savedAvailability);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};
export default paymentController;
export const paymentgetController = async (req, res) => {
  const { firstname } = req.query;
  try {
    const fillData = await paymentModel.aggregate([
      {
        $match: {
          firstname: firstname,
        },
      },
    ]);
    res.status(200).json(fillData);
  } catch (err) {
    res.status(500).json(err);
  }
};
