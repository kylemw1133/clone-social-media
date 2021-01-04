import React from "react";
import Login from "./Login";
import "./navbar.css";
const NavBar = () => {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li id="loginForm">
          <Login />
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
