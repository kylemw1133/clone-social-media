import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost({ variables: { body: input.value } });
          input.value = "";
        }}
      >
        <input
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
