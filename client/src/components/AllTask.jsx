import React from "react";
import Task from "./Task";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";
function AllTask() {
  const { tasks } = useContext(TaskContext);
  return (
    <div>
      {tasks.length !== 0 ? (
        tasks.map((task, index) => {
          return <Task key={index} task={task} id={index} />;
        })
      ) : (
        <h1 className="text-center">No Task Found</h1>
      )}
    </div>
  );
}

export default AllTask;
