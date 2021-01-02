import React, { useState } from "react";
import PostList from "./components/PostList";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
const client = new ApolloClient({
  uri: "http://localhost:5000/",
});
function App() {
  const [name, setName] = useState("kyle");
  const handleClick = () => {};
  return (
    <ApolloProvider client={client}>
      <PostList />
    </ApolloProvider>
  );
}

export default App;
