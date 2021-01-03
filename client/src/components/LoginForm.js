import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;
const LoginForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const [login, { data }] = useMutation(LOGIN_MUTATION);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({
            variables: {
              username: formState.username,
              password: formState.password,
            },
          });
          setFormState({ username: "", password: "" });
          console.log(data);
        }}
      >
        <input
          onChange={async (e) => {
            setFormState({ ...formState, username: e.target.value });
          }}
          placeholder="username"
        ></input>
        <input
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
