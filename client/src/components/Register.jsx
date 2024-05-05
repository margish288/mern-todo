import React from "react";
import { useState, useContext } from "react";
import { Navigate, redirect } from "react-router-dom";
import axios from "../config/axios.js";
import TokenContext from "../context/TokenContext.js";

function Register() {
  const [formData, setFormData] = useState({});
  const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
  const [error, setError] = useState();

  // handling form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // submitting registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData", formData);
      const result = await axios.post("/user/register", formData);
      tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
      console.log("result", result.data);
      userDispatch({ type: "SET_USER", payload: result.data.user });
      localStorage.setItem("token", result.data.token);

      // redirecting to home page
      redirect("/");
    } catch (error) {
      console.log(error);
      setError({ message: error.response.data.message });
    }
  };

  return (
    <div>
      {userToken && <Navigate to="/" />}
      <section className="register-container">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-center lg:text-left">
                  Register
                </h1>
              </div>

              <form method="post" onSubmit={handleSubmit}>
                <div>
                  {error && (
                    <div className="text-center border-2 border-green-600 p-2 mb-2 rounded-md bg-red-200 shadow-2xl">
                      {error.message}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    name="username"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="User name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    name="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
