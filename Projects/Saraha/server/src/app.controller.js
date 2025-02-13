import connectionDB from "./DB/connectionDB.js";
import messageRouter from "./modules/messages/message.controller.js";
import userRouter from "./modules/users/user.controller.js";
import { globalErrorHandler } from "./utils/errorHandling.js";


const bootstrap = async (app, express) => {

    // use json middleware for parsing request data
    app.use(express.json());
    
    // application routes
    app.use("/users", userRouter);
    app.use("/messages", messageRouter);
    
    // connect to database
    connectionDB();

    // unHandle routes
    app.use("*", (req, res, next) => {
        return next(new Error(`${req.originalUrl} is invalid URL`))
        // res.status(404).json({ message: `${req.originalUrl} not found` });
    })

    // global error handler
    app.use(globalErrorHandler)
}
export default bootstrap;