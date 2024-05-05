// components/TodoList.js
import React, { useEffect, useState } from "react";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/actions/taskActions";

const TodoList = () => {
  const dispatch = useDispatch();
  const tasksRes = useSelector((state) => state.tasks.data.taskList);

  useEffect(() => {
    setTasks(tasksRes);
  }, [tasksRes]);

  const [tasks, setTasks] = useState(tasksRes);
  const [filter, setFilter] = useState("all");

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask({ id: taskId, taskStatus: newStatus }));

    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, taskStatus: newStatus } : task
      )
    );
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.taskStatus === filter);

  return (
    <div className="m-2 p-4 bg-white rounded-lg  border shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Todo List</h2>
        <div>
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700 mr-2"
          >
            Filter:
          </label>
          <select
            id="filter"
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-md focus:outline-purple-500"
          >
            <option value="all">All</option>
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      <div>
        {filteredTasks?.length ? (
          filteredTasks.map((task) => (
            <Task task={task} handleStatusChange={handleStatusChange} />
          ))
        ) : (
          <p className="text-gray-600">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
