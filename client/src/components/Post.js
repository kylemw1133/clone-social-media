import React, { useState } from "react";

const Post = (props) => {
  return (
    <div>
      <h3>{props.username}</h3>
      <p>{props.body}</p>
      <p>{props.createdAt}</p>
    </div>
  );
};
export default Post;
