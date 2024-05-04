import userModel from "../models/user.model.js";
import taskModel from "../models/task.model.js";
import TaskValidator from "../utils/taskValidator.js";

export const addTask = async (request, response) => {
  const { title = "", description = "", taskStatus = "To do" } = request.body;
  const userId = request?.user?.id || "";

  const taskValidator = new TaskValidator();
  try {
    const hasError = taskValidator.validateTask({
      title,
      description,
      taskStatus,
    });

    if (hasError.length) {
      return response.status(400).json({ message: hasError[0] });
    }

    const task = new taskModel({
      title,
      description,
      userId,
      taskStatus,
    });

    const newTask = await task.save();
    response
      .status(200)
      .json({ message: "Task added successfully", taskid: newTask.id });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};
