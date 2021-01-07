import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import CommentList from "../components/CommentList";

const POSTS_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      comments {
        id
        body
        createdAt
        username
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

const PostPage = () => {
  const { postId } = useParams();
  const { loading, error, data } = useQuery(POSTS_QUERY, {
    variables: { postId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  return (
    <div>
      <p>{data.getPost.createdAt}</p>
      <p>{data.getPost.body}</p>
      <CommentList comments={data.getPost.comments} />
      <h3>Likes</h3>
      {data.getPost.likes.map((like) => (
        <div>
          <p>{like.id}</p>
          <p>{like.username}</p>
          <p>{like.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default PostPage;
