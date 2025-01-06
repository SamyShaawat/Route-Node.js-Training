import { Router } from "express";
import { addBook, aggregateBooksAfterYear, aggregateBooksWithFields, aggregateJoinWithLogs, aggregateUnwindGenres, createBookCollection, createBookIndex, deleteBooksBeforeYear, findBookByTitle, findBooksByGenre, findBooksByYearRange, getBooksExcludingGenres, getBooksWithSkipLimit, getBooksWithYearAsInteger, insertManyBooks, updateBookYear } from "./book.service.js";
const bookRouter = Router();


bookRouter.post("/create-book", createBookCollection);
bookRouter.post("/add-book", addBook);
bookRouter.post("/create-book-index", createBookIndex);
bookRouter.post("/insert-many-books", insertManyBooks);

bookRouter.patch("/update-book-year/:title", updateBookYear);

bookRouter.get("/find-book-by-title/title", findBookByTitle);
bookRouter.get("/find-books-by-year-range/year", findBooksByYearRange);
bookRouter.get("/find-books-by-genre/genre", findBooksByGenre);

bookRouter.get("/get-books-with-skip-limit", getBooksWithSkipLimit);
bookRouter.get("/get-books-with-year-as-integer", getBooksWithYearAsInteger);
bookRouter.get("/get-books-excluding-genres", getBooksExcludingGenres);

bookRouter.delete("/delete-books-before-year/year", deleteBooksBeforeYear);

bookRouter.get("/aggregate-books-after-year/year", aggregateBooksAfterYear);
bookRouter.get("/aggregate-books-with-fields/year", aggregateBooksWithFields);
bookRouter.get("/aggregate-unwind-genres", aggregateUnwindGenres);
bookRouter.get("/aggregate-join-with-logs", aggregateJoinWithLogs);





export default bookRouter;