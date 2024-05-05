// components/CreateTask.js
import React, { useState } from "react";
import { addTask, getAllTask } from "../redux/actions/taskActions";
import { useDispatch } from "react-redux";

const CreateTask = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const taskData = {};
    form.forEach((value, key) => {
      taskData[key] = value;
    });

    const { title, description, taskStatus } = taskData;
    if (!title || !description || !taskStatus) {
      setError("All fields are required");
      return;
    }

    dispatch(addTask(taskData));

    dispatch(getAllTask());

    setFormData({
      title: "",
      description: "",
      status: "To do",
    });
  };

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-md  border ${
        error
          ? "border-red-500 shadow-red-200"
          : "border-purple-400 shadow-purple-200"
      }`}
    >
      <h2 className="text-lg text-center font-semibold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block font-bold text-sm text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-purple-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-bold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 w-full border rounded-md focus:outline-purple-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="taskStatus"
            className="block text-sm font-bold text-gray-700"
          >
            Status
          </label>
          <select
            id="taskStatus"
            name="taskStatus"
            value={formData.taskStatus}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-purple-500"
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            Create
          </button>
          {error && (
            <span className="px-4 py-2 text-base md:text-lg text-red-500">
              {error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
