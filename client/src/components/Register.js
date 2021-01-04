import React from "react";
import { gql, useMutation } from "@apollo/client";
import RegisterForm from "./RegisterForm";
const REGISTER_MUTATION = gql`
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
      username
      token
    }
  }
`;

const Register = () => {
  const [register, { loading, error }] = useMutation("REGISTER_MUTATION", {
    onCompleted({ register }) {
      if (register) {
        localStorage.setItem("token", register.token);
        localStorage.setItem("user", register.username);
      }
    },
    onError(error) {
      console.log(error.message);
    },
  });
  if (loading) {
    console.log("loading");
    return <div>loading...</div>;
  }
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <RegisterForm register={register} />
    </div>
  );
};
export default Register;
