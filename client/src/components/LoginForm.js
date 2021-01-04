import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LoginForm = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.login({
            variables: {
              username: formState.username,
              password: formState.password,
            },
          });
          setFormState({ username: "", password: "" });
        }}
      >
        <input
          onChange={async (e) => {
            setFormState({ ...formState, username: e.target.value });
          }}
          placeholder="username"
        ></input>
        <input
          type="password"
          onChange={(e) => {
            setFormState({ ...formState, password: e.target.value });
          }}
          placeholder="password"
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
