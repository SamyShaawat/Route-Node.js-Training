import { Router } from "express";
import { getAllComments } from "./comment.service.js";
const commentRouter = Router();


commentRouter.get("/", getAllComments)



export default commentRouter;