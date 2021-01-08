import React from "react";
import Comment from "./Comment";
const CommentList = (props) => {
  return (
    <div>
      {props.comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            commentid={comment.id}
            postid={props.postid}
            createdAt={comment.createdAt}
            username={comment.username}
            body={comment.body}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
