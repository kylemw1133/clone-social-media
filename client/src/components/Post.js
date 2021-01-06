import React, { useState } from "react";
import CommentList from "./CommentList";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import "./post.css";

const Post = (props) => {
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
    </div>
  );
};
export default Post;
