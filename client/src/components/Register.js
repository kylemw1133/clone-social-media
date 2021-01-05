import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Register = (props) => {
  const history = useHistory();
  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [register] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      setFormInput({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      });
      routeChange();
    },
    onError(err) {
      console.log(err);
    },
    variables: formInput,
  });
  return (
    <form
      onSubmit={(e) => {
        register({ variables: formInput });
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
  );
};
export default Register;
