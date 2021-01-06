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
const Post = (props) => {
  const [createLike, { data }] = useMutation(LIKE_MUTATION);
  return (
    <div className="Post">
      <h3>{props.username}</h3>
      <Link to={`/posts/${props.id}`}>
        <p id="time">{moment(props.createdAt).fromNow()}</p>
      </Link>
      <p>{props.body}</p>
      <Link>
        <p>Likes: {props.likes.length}</p>
      </Link>
      <button onClick={() => createLike({ variables: { postId: props.id } })}>
        Like
      </button>
    </div>
  );
};
export default Post;
