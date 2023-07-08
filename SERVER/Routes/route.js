import express from "express";
const router = express.Router();
import { userLogin, usersignUp } from "../Controller/userController.js";
import { AddtoParkingPlace } from "../Controller/AddtoParkingPlace.js";
import { getParkingPlaceData } from "../Controller/getparkingPlaceData.js";
import requestService from "../Controller/requestService.js";
import contactDetailsController from "../Controller/contactDetailController.js";
import paymentController, { paymentgetController } from "../Controller/paymentController.js";

router.post("/signup", usersignUp);
router.post("/login", userLogin);
router.get("/parkingPlace",getParkingPlaceData);
router.post("/parkingPlaces", AddtoParkingPlace);
router.get("/requestService", requestService);
router.post("/contactDetails", contactDetailsController);
router.post("/payment", paymentController);
router.get("/getpayment", paymentgetController);



export default router;



