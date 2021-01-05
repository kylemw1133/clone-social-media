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
      <p>{props.body}</p>
      <Link to={`/posts/${props.id}`}>
        <p>{moment(props.createdAt).fromNow()}</p>
      </Link>

      <button>Comments</button>

      <Link>
        <button>Likes</button>
      </Link>
    </div>
  );
};
export default Post;
