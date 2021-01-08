import React, { useState } from "react";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import "./post.css";
const LIKE_MUTATION = gql`
  mutation createLike($postId: ID!) {
    createLike(postId: $postId)
  }
`;
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($body: String!, $postId: ID!) {
    createComment(body: $body, postId: $postId) {
      id
      body
      createdAt
      username
    }
  }
`;
// const UNLIKE_MUTATION = gql`
//   mutation deleteLike($postId: ID!) {
//     deleteLike(postId: $postId)
//   }
// `;
const Post = (props) => {
  const [commentBody, setCommentBody] = useState("");
  // const [deleteLike] = useMutation(UNLIKE_MUTATION);
  //delete like mutation in backend required id of like (change to only require postId)
  const [createLike] = useMutation(LIKE_MUTATION, {
    onError(error) {
      console.log(error.message);
      if (error.message === "User already liked the post") {
        console.log("should delete like");
        // deleteLike({ variables: { postId: props.id } });
      }
    },
  });
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted() {
      window.location.reload();
      return false;
    },
    onError(error1) {
      window.alert(error1.message);
    },
  });
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    onCompleted() {
      console.log("created comment");
    },
    onError(e) {
      console.log("error");
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
      <form
        onSubmit={(e) => {
          createComment({
            variables: {
              body: commentBody,
              postId: props.id,
            },
          });
        }}
      >
        <input
          onChange={(e) => {
            e.preventDefault();
            setCommentBody(e.target.value);
            console.log(commentBody);
          }}
          placeholder="enter comment"
        ></input>
        <button type="submit">Comment</button>
      </form>
      <button
        onClick={() => {
          deletePost({ variables: { postId: props.id } });
        }}
      >
        Delete
      </button>
    </div>
  );
};
export default Post;
