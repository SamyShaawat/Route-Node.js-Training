import { Router } from "express";
import { addAuthor, createAuthorCollection } from "./author.service.js";
const authorRouter = Router();

authorRouter.post("/create-author", createAuthorCollection);
authorRouter.post("/add-author", addAuthor);



export default authorRouter;