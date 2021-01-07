import React, { useState } from "react";
import CommentList from "./CommentList";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import "./post.css";
const LIKE_MUTATION = gql`
  mutation createLike($postId: ID!) {
    createLike(postId: $postId)
  }
`;
// const UNLIKE_MUTATION = gql`
//   mutation deleteLike($postId: ID!) {
//     deleteLike(postId: $postId)
//   }
// `;
const Post = (props) => {
  // const [deleteLike] = useMutation(UNLIKE_MUTATION);
  //delete like mutation in backend required id of like (change to only require postId)
  const [createLike, { loading, error, data }] = useMutation(LIKE_MUTATION, {
    onError(error) {
      console.log(error.message);
      if (error.message === "User already liked the post") {
        console.log("should delete like");
        // deleteLike({ variables: { postId: props.id } });
      }
    },
  });
  return (
    <div className="Post">
      <h3>{props.username}</h3>
      <Link to={`/posts/${props.id}`}>
        <p id="time">{moment(props.createdAt).fromNow()}</p>
      </Link>
      <p>{props.body}</p>
      <p>Likes: {props.likes.length}</p>
      <button onClick={() => createLike({ variables: { postId: props.id } })}>
        Like
      </button>
      <button>Comment</button>
    </div>
  );
};
export default Post;
