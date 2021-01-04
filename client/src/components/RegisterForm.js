import React, { useState } from "react";

const RegisterForm = (props) => {
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.register({ variables: formInput });
        }}
      >
        <input
          onChange={(e) => {
            setFormInput({ ...formInput, username: e.target.value });
          }}
          placeholder="username"
        ></input>
        <input
          onChange={(e) => {
            setFormInput({ ...formInput, password: e.target.value });
          }}
          placeholder="password"
        ></input>
        <input
          onChange={(e) => {
            setFormInput({ ...formInput, confirmPassword: e.target.value });
          }}
          placeholder="Repeat password"
        ></input>
        <input
          onChange={(e) => {
            setFormInput({ ...formInput, email: e.target.value });
          }}
          placeholder="email"
        ></input>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
export default RegisterForm;
