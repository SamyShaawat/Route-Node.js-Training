import connection from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";


const bootstrap = (app, express,cors) => {
    app.use(express.json());
    app.use(cors())

    connection;

    app.use("/users", userRouter);

    app.use("*", (req, res, next) => {
        res.status(404).json({ message: `${req.originalUrl} not found` });
    })
}
export default bootstrap;