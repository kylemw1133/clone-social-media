import React from "react";
import Comment from "./Comment";
const CommentList = (props) => {
  return (
    <div>
      <h5>Comments</h5>
      {props.comments.map((comment) => (
        <Comment
          key={comment.id}
          createdAt={comment.createdAt}
          username={comment.username}
          body={comment.body}
        />
      ))}
    </div>
  );
};

export default CommentList;
