export const removeToken = () => {
  localStorage.removeItem("authToken");
  document.cookie = null;
};
