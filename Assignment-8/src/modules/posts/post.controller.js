import { Router } from "express";
import { addPost, deletePost, getPostDetails } from "./post.service.js";
const postRouter = Router();


postRouter.post("/add-post", addPost);
postRouter.delete("/delete-post/:postId", deletePost);
postRouter.get("/get-post-details", getPostDetails);


export default postRouter;