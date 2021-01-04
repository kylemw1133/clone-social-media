import React, { useState } from "react";
import CommentList from "./CommentList";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import "./post.css";

const Post = (props) => {
  return (
    <div className="Post">
      <h3>{props.username}</h3>
      <p>{props.body}</p>
      <p>{moment(props.createdAt).fromNow()}</p>
      <CommentList comments={props.comments} />
    </div>
  );
};
export default Post;
