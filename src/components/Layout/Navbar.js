import React, { useContext } from "react";
import LoginContext from "../Login/store/loginContext";
import { Link } from "react-router-dom";
import codingLogo from "../../assets/codingLogo.jpg";

const NavBar = () => {
  const ctx = useContext(LoginContext);

  const start = (
    <img
      src={codingLogo}
      className="object-cover w-10 h-10 rounded-full"
      alt="Blog Logo"
    />
  );

  return (
    <header className="bg-gray-100 shadow-md p-2.5 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        {start}
        <span className="text-xl font-semibold text-gray-800">
          Coding World
        </span>
      </Link>

      <nav>
        <ul className="flex items-center space-x-6 text-gray-800 mt-2 mr-3">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-1 hover:text-blue-600 no-underline"
            >
              <i className="pi pi-home mr-1"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/problems" className="hover:text-blue-600 no-underline">
              <i className="pi pi-list-check mt-1 mr-1"></i>
              Problems
            </Link>
          </li>
          {ctx.isLoggedin && (
            <li>
              <Link
                to="/profile"
                className="flex items-center space-x-1 hover:text-blue-600 no-underline"
              >
                <i className="pi pi-user mr-1"></i>
                <span>Profile</span>
              </Link>
            </li>
          )}
          {!ctx.isLoggedin && (
            <li>
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-blue-600 no-underline"
              >
                <i className="pi pi-sign-in mr-1"></i>
                <span>Login</span>
              </Link>
            </li>
          )}
          {ctx.isLoggedin && (
            <li>
              <button
                onClick={() => ctx.logout()}
                className="flex items-center space-x-1 hover:text-red-600 focus:outline-none no-underline"
              >
                <i className="pi pi-sign-out mr-1"></i>
                <span>Logout</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
