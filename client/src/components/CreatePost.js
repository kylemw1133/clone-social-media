import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import "./createPost.css";
const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
    }
  }
`;
const CreatePost = (props) => {
  const [createPost] = useMutation(CREATE_POST);
  const [postBody, setPostBody] = useState("");

  return (
    <div className="createPost">
      <form
        onSubmit={async (e) => {
          createPost({ variables: { body: postBody } });
          setPostBody("");
        }}
      >
        <textarea
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
        />
        <button type="submit">CreatePost</button>
      </form>
    </div>
  );
};

export default CreatePost;
