const Post = require("../../models/Post.js");
const checkAuth = require("../../util/check-auth");
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
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
      try {
        const thePost = await Post.findById(postId);
        const user = checkAuth(context);
        await thePost.comments.push({
          body: body,
          createdAt: new Date().toISOString(),
          username: user.username,
        });
        await thePost.save();
        return thePost.comments[thePost.comments.length - 1];
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      try {
        const thePost = await Post.findById(postId);
        const user = checkAuth(context);
        if (
          thePost.comments.some(
            (comment) =>
              comment.username === user.username && comment._id == commentId
          )
        ) {
          thePost.comments.pull({ _id: commentId });
          await thePost.save();
          return "comment deleted";
        } else {
          throw new Error("not a valid operation");
        }
      } catch (err) {
        throw new Error(err);
      }
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
    async deleteLike(_, { postId, likeId }, context) {
      try {
        const thePost = await Post.findById(postId);
        const user = checkAuth(context);
        const found = thePost.likes.find(
          (element) => element.username === user.username
        );
        if (found) {
          thePost.likes.pull({ _id: likeId });
          await thePost.save();
          return "like deleted";
        } else {
          throw new Error("Like not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
