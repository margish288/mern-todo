import axios from "axios";

export const callApi = async (method, url, data) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      data,
      cancelToken: null,
      headers,
      responseType: "json",
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        // console.log("ERROR in calling API", err);

        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        if (err.response) {
          reject(err.response.data);
        } else {
          reject(err);
        }
      });
  });
};
