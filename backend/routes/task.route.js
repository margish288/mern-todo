import express from "express";
import {
  addTask,
  removeTask,
  getTasks,
  updateTask,
} from "../controller/task.controller.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();

router.post("/add", authUser, addTask);
router.put("/update", authUser, updateTask);
router.delete("/remove", authUser, removeTask);
router.get("/all", authUser, getTasks);

export default router;
