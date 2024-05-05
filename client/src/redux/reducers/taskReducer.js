const state = {
  status: null,
  isLoading: false,
  data: null,
};

const allTaskState = {
  status: null,
  isLoading: false,
  data: [],
};

const taskReducer = (store = state, action) => {
  let newStore = {};

  switch (action.type) {
    case "ADD_TASK_PENDING":
      newStore = {
        ...store,
        status: "pending",
        isLoading: true,
      };
      break;

    case "ADD_TASK_FULFILLED":
      newStore = {
        ...store,
        isLoading: false,
        status: "success",
        data: action.payload.data,
      };
      break;

    case "ADD_TASK_REJECTED":
      newStore = {
        ...store,
        status: "failed",
        isLoading: false,
        data: action.payload,
      };
      break;

    case "UPDATE_TASK_PENDING":
      newStore = {
        ...store,
        status: "pending",
        isLoading: true,
      };
      break;

    case "UPDATE_TASK_FULFILLED":
      newStore = {
        ...store,
        isLoading: false,
        status: "success",
        data: action.payload.data,
      };
      break;

    case "UPDATE_TASK_REJECTED":
      newStore = {
        ...store,
        status: "failed",
        isLoading: false,
        data: action.payload,
      };
      break;

    case "DELETE_TASK_PENDING":
      newStore = {
        ...store,
        status: "pending",
        isLoading: true,
      };
      break;

    case "DELETE_TASK_FULFILLED":
      newStore = {
        ...store,
        isLoading: false,
        status: "success",
        data: action.payload.data,
      };
      break;

    case "DELETE_TASK_REJECTED":
      newStore = {
        ...store,
        status: "failed",
        isLoading: false,
        data: action.payload,
      };
      break;

    default:
      newStore = store;
  }

  return newStore;
};

export const allTaskReducer = (store = allTaskState, action) => {
  let newStore = {};

  switch (action.type) {
    case "GET_TASKS_PENDING":
      newStore = {
        ...store,
        status: "pending",
        isLoading: true,
      };
      break;

    case "GET_TASKS_FULFILLED":
      newStore = {
        ...store,
        isLoading: false,
        status: "success",
        data: action.payload.data,
      };
      break;

    case "GET_TASKS_REJECTED":
      newStore = {
        ...store,
        status: "failed",
        isLoading: false,
        data: action.payload,
      };
      break;

    default:
      newStore = store;
  }

  return newStore;
};

export default taskReducer;
