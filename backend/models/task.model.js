import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 500,
    },
    userId: { type: String, required: true, trim: true },
    taskStatus: {
      type: String,
      enum: ["To do", "In progress", "Done"],
      default: "To do",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
