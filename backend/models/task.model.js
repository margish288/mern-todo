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
    completed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
