import React from "react";
import LoginForm from "./LoginForm";
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
const Login = () => {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem("token", login.token);
        localStorage.setItem("user", login.username);
      }
    },
    onError(error) {
      console.log(error.message);
    },
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  return <LoginForm login={login} />;
};
export default Login;
