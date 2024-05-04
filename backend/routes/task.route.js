import express from "express";
import {
  addTask,
  removeTask,
  getTasks,
} from "../controller/task.controller.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();

router.post("/add", authUser, addTask);
router.post("/remove", authUser, removeTask);
router.get("/all", authUser, getTasks);

export default router;
