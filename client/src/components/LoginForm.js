import React from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation LoginForm($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`;
const LoginForm = () => {
  let inputUsername;
  let inputPassword;
  const [login, { data }] = useMutation(LOGIN);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputUsername, inputPassword);
    inputUsername = "";
    inputPassword = "";
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={(node) => {
            inputUsername = node;
          }}
          placeholder="username"
        ></input>
        <input
          ref={(node) => {
            inputPassword = node;
          }}
          placeholder="password"
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
