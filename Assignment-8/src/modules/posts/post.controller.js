import { Router } from "express";
import { getAllPosts } from "./post.service.js";
const postRouter = Router();



postRouter.get("/", getAllPosts);



export default postRouter;