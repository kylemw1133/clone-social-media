import React, { useState } from "react";
import CommentList from "./CommentList";
import "./post.css";
const Post = (props) => {
  return (
    <div className="Post">
      <h3>{props.username}</h3>
      <p>{props.body}</p>
      <p>{props.createdAt}</p>
      <CommentList comments={props.comments} />
    </div>
  );
};
export default Post;
