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
    response.status(200).json({
      message: "Task added successfully",
      title,
      description,
      taskStatus,
      createdAt: newTask.createdAt,
      taskid: newTask.id,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (request, response) => {
  const { id, taskStatus } = request.body;
  const userId = request?.user?.id || "";

  try {
    const task = await taskModel.findOne({ _id: id, userId });

    if (!task) {
      return response.status(400).json({ message: "Task not found" });
    }

    await taskModel.updateOne({ _id: id, userId }, { taskStatus });
    response.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const removeTask = async (request, response) => {
  const { id } = request.body;
  const userId = request?.user?.id || "";

  try {
    const task = await taskModel.findOne({ _id: id, userId });

    if (!task) {
      return response.status(400).json({ message: "Task not found" });
    }

    await taskModel.deleteOne({ _id: id, userId });
    response.status(200).json({ message: "Task removed successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (request, response) => {
  const userId = request?.user?.id || "";

  try {
    const tasks = await taskModel.find({ userId });

    const taskList = tasks.map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      taskStatus: task.taskStatus,
    }));

    response.status(200).json({ taskList });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Error while fetching all tasks." });
  }
};
