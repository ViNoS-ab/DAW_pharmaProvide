import express from "express";
import {
  getAllAdvices,
  createAdvice,
  getAdviceById,
  deleteMedicine,
  updateAdvice,
} from "../controllers/advices.js";
import {
  isAuthorized,
  populateUser,
} from "../middlewares/authorizartion.js";

const router = express.Router();

router.get("/", populateUser, getAllAdvices);
router.get("/:id", getAdviceById);
router.post("/", populateUser, isAuthorized, createAdvice);
router.delete("/:id", populateUser, isAuthorized, deleteMedicine);
router.put("/:id", populateUser, isAuthorized, updateAdvice);

export default router;
