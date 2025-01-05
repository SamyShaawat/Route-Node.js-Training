import { Router } from "express";
import { addPost, commentCount, deletePost, getPostDetails } from "./post.service.js";
const postRouter = Router();


postRouter.post("/add-post", addPost);
postRouter.delete("/delete-post/:postId", deletePost);
postRouter.get("/get-post-details", getPostDetails);
postRouter.get("/comment-count", commentCount);


export default postRouter;