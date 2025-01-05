import { Router } from "express";
import { addBook } from "./book.service.js";
const bookRouter = Router();



bookRouter.post("/add-book", addBook);


export default bookRouter;