import express from "express";
const router = express.Router();
import { userLogin, usersignUp } from "../Controller/userController.js";
import { createServiceRequest } from "../Controller/ParkingAvailabilityController.js";
import { getParkingAvailability } from "../Controller/ParkingAvailabilityController.js";
import { deleteServiceData } from "../Controller/ParkingAvailabilityController.js";
router.post("/signup", usersignUp);
router.post("/login", userLogin);
router.get("/bookslot",getParkingAvailability);
router.post("/servicerequest", createServiceRequest);
router.delete(`/delete/:id`,deleteServiceData)
export default router;


