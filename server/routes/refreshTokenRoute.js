import express from "express";
import { refreshToken } from "../controllers/refreshTokenController.js";

const router = express.Router();


router.post("/refresh-token", refreshToken);
// router.post("renew-access-token", )

export default router