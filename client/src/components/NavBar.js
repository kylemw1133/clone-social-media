import React from "react";
import Login from "./Login";

import { Link } from "react-router-dom";
import "./navbar.css";
const NavBar = () => {
  const username = localStorage.getItem("user");
  return (
    <div className="Navbar">
      <ul>
        <li>
          <Link className="navLink" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navLink" to="/register">
            Register
          </Link>
        </li>
        <li id="loginForm">
          <Login />
        </li>
        <li></li>
        <li>{username}</li>
      </ul>
    </div>
  );
};
export default NavBar;
