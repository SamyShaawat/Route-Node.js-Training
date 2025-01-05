import { Router } from "express";
import { addBook, createBookCollection, createBookIndex, findBookByTitle, findBooksByGenre, findBooksByYearRange, insertManyBooks, updateBookYear } from "./book.service.js";
const bookRouter = Router();


bookRouter.post("/create-book", createBookCollection);
bookRouter.post("/add-book", addBook);
bookRouter.post("/create-book-index", createBookIndex);
bookRouter.post("/insert-many-books", insertManyBooks);
bookRouter.patch("/update-book-year/:title", updateBookYear);
bookRouter.get("/find-book-by-title/title", findBookByTitle);
bookRouter.get("/find-books-by-year-range/year", findBooksByYearRange);
bookRouter.get("/find-books-by-genre/genre", findBooksByGenre);



export default bookRouter;