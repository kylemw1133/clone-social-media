import React from "react";
import "./comment.css";
const Comment = (props) => {
  return (
    <div className="Comment">
      <p>{props.username}</p>
      <p>{props.createdAt}</p>
      <p>{props.body}</p>
    </div>
  );
};

export default Comment;
