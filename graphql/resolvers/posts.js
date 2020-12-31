const Post = require("../../models/Post.js");
const checkAuth = require("../../util/check-auth");
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutatiion: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      try {
        const mypost = await Post.findById(postId);
        if (mypost) {
          const user = checkAuth(context);
          if (user.username === mypost.username) {
            Post.findByIdAndDelete(postId, function (err) {
              if (err) console.log(err);
              console.log("Successful deletion");
            });
          } else {
            throw new Error("Not valid user");
          }
        } else {
          throw new Error("Not the correct id for post");
        }
        return "Post deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
