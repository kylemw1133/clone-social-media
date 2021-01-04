import React from "react";
import Post from "./Post";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./postList.css";
const POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      comments {
        body
        username
        createdAt
        id
      }
    }
  }
`;

const PostList = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  return (
    <div className="PostList">
      {data.getPosts.map((post) => (
        <div key={post.id}>
          <Post
            key={post.id}
            id={post.id}
            body={post.body}
            username={post.username}
            createdAt={post.createdAt}
            comments={post.comments}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
