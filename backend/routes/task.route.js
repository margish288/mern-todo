import express from "express";
import { addTask } from "../controller/task.controller.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();

router.post("/add", authUser, addTask);

export default router;
