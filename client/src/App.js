import React, { useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PostPage from "./pages/PostPage";

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
      authorization: token ? `Bearer ${token}` : "Bearer ",
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
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route path="/posts/:postId" component={PostPage} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
