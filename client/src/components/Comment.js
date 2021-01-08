import React from "react";
import "./comment.css";
import { gql, useMutation } from "@apollo/client";
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId)
  }
`;
const Comment = (props) => {
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted() {
      console.log("comment deleted");
    },
    onError(e) {
      console.log(e);
    },
  });
  return (
    <div className="Comment">
      <p>{props.username}</p>
      <p>{props.createdAt}</p>
      <p>{props.body}</p>
      <button
        onClick={() =>
          deleteComment({
            variables: { postId: props.postid, commentId: props.commentid },
          })
        }
      >
        Delete
      </button>
    </div>
  );
};

export default Comment;
