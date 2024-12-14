import { checkConnectionDB, checkSyncDB } from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";

const bootstrap = (app, express) => {
    app.use(express.json());

    app.use("/users", userRouter);

    checkConnectionDB();

    checkSyncDB();

    app.use("*", (req, res, next) => {
        res.status(404).json({ message: `${req.originalUrl} not found` });
    })
}
export default bootstrap