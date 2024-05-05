const state = {
  user: null,
  status: null,
  isLoading: false,
  data: null,
};

const userReducer = (store = state, action) => {
  let newStore = {};

  switch (action.type) {
    case "USER_LOGIN_PENDING":
      newStore = {
        ...store,
        status: "pending",
        isLoading: true,
      };
      break;

    case "USER_LOGIN_FULFILLED":
      newStore = {
        ...store,
        isLoading: false,
        status: "success",
        user: action.payload.data.user,
        data: action.payload.data,
      };
      break;

    case "USER_LOGIN_REJECTED":
      newStore = {
        ...store,
        status: "failed",
        isLoading: false,
        user: null,
        data: action.payload,
      };
      break;

    case "USER_REGISTER_FULFILLED":
      newStore = {
        ...store,
        isLoading: false,
        status: "success",
        user: action.payload.data,
      };
      break;

    case "USER_REGISTER_PENDING":
      newStore = {
        ...store,
        status: "pending",
        isLoading: true,
      };
      break;

    case "USER_REGISTER_REJECTED":
      newStore = {
        ...store,
        status: "failed",
        isLoading: false,
        data: action.payload,
        user: null,
      };
      break;

    case "GET_USER_PENDING":
      newStore = {
        ...store,
        status: "pending",
        isLoading: true,
      };
      break;

    case "GET_USER_FULFILLED":
      newStore = {
        ...store,
        isLoading: false,
        status: "success",
        user: action.payload.data.user,
        data: action.payload.data,
      };
      break;

    case "GET_USER_REJECTED":
      newStore = {
        ...store,
        status: "failed",
        isLoading: false,
        user: null,
        data: action.payload,
      };
      break;

    default:
      newStore = { ...store };
      break;
  }

  return newStore;
};

export default userReducer;
