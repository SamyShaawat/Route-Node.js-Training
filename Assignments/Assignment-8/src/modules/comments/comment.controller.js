import { Router } from "express";
import { createBulkComments, findOrCreateComment, getCommentDetails, getNewestComments, searchComments, updateComment } from "./comment.service.js";

const commentRouter = Router();


commentRouter.post("/create-bulk-comments", createBulkComments);
commentRouter.patch("/update-comment/:commentId", updateComment);
commentRouter.post("/find-or-create", findOrCreateComment);
commentRouter.get("/search-comments", searchComments);
commentRouter.get("/newest/:postId", getNewestComments);
commentRouter.get("/details/:id", getCommentDetails);



export default commentRouter;