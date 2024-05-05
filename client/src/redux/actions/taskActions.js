import { callApi } from "../../config/axios";
import { BASE_URL } from "../../config/config";

export const getAllTask = () => {
  return async (dispatch) => {
    dispatch({
      type: "GET_TASKS",
      payload: callApi("get", `${BASE_URL}/task/all`),
    });
  };
};

export const addTask = ({ title, description, taskStatus }) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_TASK",
      payload: callApi("post", `${BASE_URL}/task/add`, {
        title,
        description,
        taskStatus,
      }),
    });
  };
};

export const updateTask = ({ id, taskStatus }) => {
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: callApi("put", `${BASE_URL}/task/update`, {
        id,
        taskStatus,
      }),
    });
  };
};

export const removeTask = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "DELETE_TASK",
      payload: callApi("delete", `${BASE_URL}/task/remove`, {
        id,
      }),
    });
  };
};
