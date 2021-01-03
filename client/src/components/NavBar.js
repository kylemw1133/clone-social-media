import React from "react";
import LoginForm from "./LoginForm";

import "./navbar.css";
const NavBar = () => {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li id="loginForm">
          <LoginForm />
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
