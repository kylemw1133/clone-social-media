import React from "react";

import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
const Home = () => {
  return (
    <div>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;
