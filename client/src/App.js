import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import TodoList from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/actions/userActions";
import { getAllTask } from "./redux/actions/taskActions";

const App = () => {
  const userResponse = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getUser());
      dispatch(getAllTask());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={!(token && userResponse.user) ? <Login /> : <Layout />}
        >
          <Route index element={<TodoList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
