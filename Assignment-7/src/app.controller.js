import connection from "./DB/connectionDB.js";
import dbRouter from "./DB/db.controller.js";
import productRouter from "./modules/products/product.controller.js";
import userRouter from "./modules/users/user.controller.js";

const bootstrap = (app, express) => {
    app.use(express.json());

    connection;

    app.use("/users", userRouter);
    app.use("/products", productRouter);
    app.use("/DB", dbRouter);


    app.use("*", (req, res, next) => {
        res.status(404).json({ message: `${req.originalUrl} not found` });
    })
}
export default bootstrap