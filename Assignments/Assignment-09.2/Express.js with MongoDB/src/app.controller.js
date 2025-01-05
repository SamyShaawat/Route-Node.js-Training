import { connectionDB } from "./DB/connectionDB.js";
import authorRouter from "./modules/authors/author.controller.js";
import bookRouter from "./modules/books/book.controller.js";
import logRouter from "./modules/logsModule/log.controller.js";

const bootstrap = async (app, express) => {
    app.use(express.json());

    connectionDB();
    app.use("/authors", authorRouter);
    app.use("/books", bookRouter);
    app.use("/logs", logRouter);
    app.use("*", (req, res, next) => {
        res.status(404).json({ message: `${req.originalUrl} not found` });
    })
}
export default bootstrap;