export const removeToken = () => {
  localStorage.removeItem("token");
  document.cookie = null;
};
