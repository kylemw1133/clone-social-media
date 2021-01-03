import React from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`;
const LoginForm = () => {
  let inputUsername;
  let inputPassword;
  const { loading, error, login } = useMutation(LOGIN, {
    variables: {
      username: inputUsername,
      password: inputPassword,
    },
    onCompleted: ({ login }) => {
      console.log(login.token);
      localStorage.setItem("Authorization", login.token);
    },
  });
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
