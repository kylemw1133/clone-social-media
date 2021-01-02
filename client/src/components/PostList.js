import React from "react";
import Post from "./Post";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
    }
  }
`;

const PostList = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  return (
    <div>
      {data.getPosts.map((post) => (
        <Post
          key={post.id}
          body={post.body}
          username={post.username}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
};

export default PostList;
