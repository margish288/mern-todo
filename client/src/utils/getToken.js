export const getToken = () => {
  const cookies = document.cookie;
  const cookiesArray = cookies.split(";");
  const parsedCookies = {};

  cookiesArray.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    parsedCookies[name] = value;
  });

  const token = parsedCookies["token"];
  console.log("getToken", cookiesArray, token);
  return token;
};
