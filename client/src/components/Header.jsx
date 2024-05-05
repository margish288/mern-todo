// components/Header.js
import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userLogout());
  };

  return (
    <div>
      <header className="p-2 md:p-4 bg-purple-600 text-white">
        <nav className="flex justify-between items-center">
          <h1 className="text-base md:text-lg font-semibold">Todo App</h1>
          <button
            className="bg-white text-purple-600 px-2 md:px-3 py-1 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
