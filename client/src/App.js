import React, { useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import LoginForm from "./components/LoginForm";
const httpLink = createHttpLink({
  uri: "http://localhost:5000/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
        ? `Bearer ${token}`
        : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZWNkM2I5MmE5NWIwMWJiOTBhZjU1MCIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVzZXIyIiwiaWF0IjoxNjA5NjIxNDMzLCJleHAiOjE2MDk2MjUwMzN9.IM5r6wn3XLLFAXrnlF1nFBQ6db41HcKlbKP6nHXm3j4",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <PostList />
      <CreatePost />
      <LoginForm />
    </ApolloProvider>
  );
}

export default App;
