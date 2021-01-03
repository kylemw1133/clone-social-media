import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
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
  let input;
  const [createPost, { data }] = useMutation(CREATE_POST);
  const [body, setBody] = useState("");

  return (
    <div className="createPost">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost({ variables: { body: input.value } });
          input.value = "";
        }}
      >
        <textarea
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">CreatePost</button>
      </form>
    </div>
  );
};

export default CreatePost;
