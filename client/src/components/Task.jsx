import React from "react";

const Task = ({ task, handleStatusChange }) => {
  return (
    <div key={task.id} className="border-b py-2">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600 overflow-wrap break-words">
        {task.description}
      </p>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mt-2">
        <div>
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <span
            className={`ml-2 px-2 py-1 rounded-md ${
              task.taskStatus === "To do"
                ? "bg-red-500 text-white"
                : task.taskStatus === "In progress"
                ? "bg-purple-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {task.taskStatus}
          </span>
        </div>
        <div>
          <label
            htmlFor={`status-${task.id}`}
            className="text-sm font-medium text-gray-700"
          >
            Change:
          </label>
          <select
            id={`status-${task.id}`}
            name={`status-${task.id}`}
            value={task.taskStatus}
            onChange={(e) => handleStatusChange(task.id, e.target.value)}
            className="ml-2 p-1 border rounded-md focus:outline-purple-500"
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Task;
