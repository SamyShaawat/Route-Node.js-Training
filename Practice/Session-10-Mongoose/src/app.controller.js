import { connectionDB } from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";


const bootstrap = async (app, express) => {
    app.use(express.json());

    connectionDB();
    app.use("/users", userRouter);
    app.use("*", (req, res, next) => {
        res.status(404).json({ message: `${req.originalUrl} not found` });
    })
}
export default bootstrap;