const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type Like {
    username: String!
    createdAt: String!
  }
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(body: String!, postId: ID!): Comment!
    deleteComment(postId: ID!, commentId: ID!): String!
    createLike(postId: ID!): String!
    deleteLike(postId: ID!): String!
  }
`;
