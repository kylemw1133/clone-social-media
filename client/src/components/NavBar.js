import React from "react";
import Login from "./Login";

import { Link } from "react-router-dom";
import "./navbar.css";
const NavBar = () => {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li id="loginForm">
          <Login />
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
