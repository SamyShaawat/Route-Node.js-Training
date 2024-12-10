import express, { json } from 'express';
import userRouter from './users/users.routes.js';
const port = 3000;
const app = express();

app.use(json());

app.use( userRouter);

app.use("*", (req, res, next) => {
    res.status(404).json({ message: `${req.originalUrl} not found` });
})
app.listen(port, () => {
    console.log(`listening on port ${port}`);

})















