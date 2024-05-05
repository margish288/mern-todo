import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controller/user.controller.js";
import { authUser } from "../middleware/authUser.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authUser, getUserProfile);

export default router;
