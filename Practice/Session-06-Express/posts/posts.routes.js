const { Router } = require("express");
const { getPosts, addPost, updatePost, deletePost } = require("./posts.controller.js");

const postRouter = Router();


postRouter.get("/", getPosts);
postRouter.post("/", addPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

module.exports = postRouter;
