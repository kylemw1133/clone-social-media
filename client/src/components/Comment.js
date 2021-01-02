import React from "react";

const Comment = (props) => {
  return (
    <div>
      <p>{props.username}</p>
      <p>{props.createdAt}</p>
      <p>{props.body}</p>
    </div>
  );
};

export default Comment;
