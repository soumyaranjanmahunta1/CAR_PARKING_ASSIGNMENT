import contactModel from "../Model/contactDetailSchema.js";

const contactDetailsController = (req,res) => {
    const { Email, Mobile, Query } = req.body;

    const newAvailability = new contactModel({
      Email,
      Mobile,
      Query,
    });
    newAvailability.save()
        .then((avalable) => {
        res.status(200).json(avalable);
        }).catch((err => {
        res.status(500).json({ error: err.message });
    }))
    
}
export default contactDetailsController;