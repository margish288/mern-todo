import { useEffect, useReducer } from "react";
import axios from "./config/axios";
import tokenReducer from "./reducers/tokenReducer";
import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenContext from "./context/TokenContext";
import TaskContext from "./context/TaskContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Layout from "./components/Layout";
import AllTask from "./components/AllTask";
import Active from "./components/Active";
import Completed from "./components/Completed";

function App() {
  const token = localStorage.getItem("token");
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token);
  const [user, userDispatch] = useReducer(userReducer, {});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log("fetchUser");
        const res = await axios.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        tokenDispatch({ type: "SET_TOKEN", payload: userToken });
        userDispatch({ type: "SET_USER", payload: res.data.user });
      } catch (error) {
        console.log(error);
      }
    };

    if (userToken) {
      fetchUser();
    }
  }, [userToken]);

  return (
    <BrowserRouter>
      <TokenContext.Provider
        value={{ userToken, tokenDispatch, user, userDispatch }}
      >
        <TaskContext.Provider value={{ tasks, dispatch }}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={token ? <Layout /> : <Login />}>
                <Route index element={<AllTask />} />
                <Route path="active" element={<Active />} />
                <Route path="completed" element={<Completed />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </TaskContext.Provider>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}

export default App;
