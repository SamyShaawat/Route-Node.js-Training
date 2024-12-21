import { checkConnectionDB, checkSyncDB } from "./DB/connectionDB.js";
import productRouter from "./modules/products/product.controller.js";
import userRouter from "./modules/users/user.controller.js";

const bootstrap = (app, express) => {
    app.use(express.json());

    app.use("/users", userRouter);
    app.use("/posts", postRouter);
    app.use("/comments", commentRouter);

    checkConnectionDB()
    checkSyncDB()
    app.use("*", (req, res, next) => {
        res.status(404).json({ message: `${req.originalUrl} not found` });
    })
}
export default bootstrap