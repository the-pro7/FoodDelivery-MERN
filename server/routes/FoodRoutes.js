import express from "express";
import { addProducts, getFoodById, getFoodItems } from "../controllers/FoodController.js";

const router = express.Router();

router.post("/add", addProducts);
router.get("/", getFoodItems);
router.get("/:id", getFoodById);

export default router;
