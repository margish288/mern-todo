import Cookie from "js-cookie";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  return localStorage.setItem("token", token);
};
