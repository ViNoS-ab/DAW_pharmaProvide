import express from "express";
import {
  getAllMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicineById,
} from "../controllers/medecines.js";
import {
  populateUser,
  isAuthorized,
} from "../middlewares/authorizartion.js";

const router = express.Router();

router.post("/", populateUser, isAuthorized, createMedicine);
router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);
router.put("/:id", populateUser, isAuthorized, updateMedicine);
router.delete("/:id", populateUser, isAuthorized, deleteMedicine);

export default router;
