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
    </div>
  );
};

export default PostPage;
