import React from "react";
import { useContext } from "react";
import { Outlet, NavLink, redirect } from "react-router-dom";
import TokenContext from "../context/TokenContext.js";
import { removeToken } from "../utils/removeToken.js";

function Header() {
  const token = localStorage.getItem("token");
  const { user } = useContext(TokenContext);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="h-12 bg-slate-200 flex justify-between items-center">
        <div className="w-1/4 text-center">
          <NavLink to="/" className="text-lg md:text-xl lg:text-2xl">
            Todo App
          </NavLink>
        </div>
        <div className="flex justify-between">
          {token ? (
            <div className="flex items-center justify-center">
              <p className="mr-5">
                welcome,{" "}
                <span className=" text-xl text-blue-800 capitalize">
                  {user.name}
                </span>
              </p>
              <button onClick={logout} className="logout mr-4">
                Logout
              </button>
            </div>
          ) : (
            <ul className="flex justify-end gap-3 w-3/4 pr-6">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Header;
