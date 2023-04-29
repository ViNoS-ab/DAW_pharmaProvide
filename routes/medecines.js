import express from "express";
import {
  getAllMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicineById,
} from "../controllers/medecines.js";
import { isAuthenticated } from "../middlewares/authorizartion.js";

const router = express.Router();

router.post("/", isAuthenticated, createMedicine);
router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);
router.put("/:id", isAuthenticated, updateMedicine);
router.delete("/:id", isAuthenticated, deleteMedicine);

export default router;
