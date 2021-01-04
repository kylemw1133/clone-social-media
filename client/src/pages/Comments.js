import React from "react";
import CommentList from "../components/CommentList";

const Comments = (props) => {
  return <CommentList comments={props.comments} />;
};

export default Comments;
