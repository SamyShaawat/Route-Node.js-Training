import { Router } from "express";
import { addAuthor } from "./author.service.js";
const authorRouter = Router();


authorRouter.post("/add-author", addAuthor);



export default authorRouter;