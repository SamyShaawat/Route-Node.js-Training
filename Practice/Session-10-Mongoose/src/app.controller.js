import { connectionDB } from "./DB/connectionDB.js";


const bootstrap = async (app, express) => {
    app.use(express.json());

    connectionDB();

    app.use("*", (req, res, next) => {
        res.status(404).json({ message: `${req.originalUrl} not found` });
    })
}
export default bootstrap