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
    async createComment(_, { body, postId }, context) {
      const thePost = await Post.findById(postId);
      const user = checkAuth(context);
      await thePost.comments.push({
        body: body,
        createdAt: new Date().toISOString(),
        username: user.username,
      });
      await thePost.save();
      return thePost.comments[thePost.comments.length - 1];
    },
    async deleteComment(_, { postId, commentId }, context) {
      const thePost = await Post.findById(postId);
      const user = checkAuth(context);
      thePost.comments.pull({ _id: commentId });
      await thePost.save();
      return "pulled";
      // console.log(found);
      // if (typeof found !== "undefined") {
      //   if (user.username === found.username) {
      //     console.log("Reached where comment should be pulled");
      //     Post.comments.pull({ _id: commentId });
      //     return "should have removed";
      //   } else {
      //     throw new Error("No permission to delete");
      //   }
      // } else {
      //   throw new Error("Comment does not exist");
      // }
    },
    async createLike(_, { postId }, context) {
      const thePost = await Post.findById(postId);
      const user = checkAuth(context);
      const found = thePost.likes.find(
        (element) => element.username === user.username
      );
      if (typeof found === "undefined") {
        await thePost.likes.push({
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await thePost.save();
        return "Successfully liked the post";
      } else {
        throw new Error("User already liked the post");
      }
    },
  },
};
