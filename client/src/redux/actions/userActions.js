import { callApi } from "../../config/axios";
import { BASE_URL } from "../../config/config";

export const userLogin = ({ email, password, username }) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_LOGIN",
      payload: callApi("post", `${BASE_URL}/user/login`, {
        email,
        password,
      }),
    });
  };
};

export const userLogout = () => ({
  type: "USER_LOGOUT",
});

// export const userRegister = ({ email, password, username }) => ({
//   type: "USER_REGISTER",
//   payload: callApi("post", `${BASE_URL}/user/register`, {
//     email,
//     password,
//     username,
//   }),
// });

export const userRegister = ({ email, password, username }) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REGISTER",
      payload: callApi("post", `${BASE_URL}/user/register`, {
        email,
        password,
        username,
      }),
    });
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch({
      type: "GET_USER",
      payload: callApi("get", `${BASE_URL}/user/profile`),
    });
  };
};
