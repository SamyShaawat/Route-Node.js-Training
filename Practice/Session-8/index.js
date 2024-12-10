import express, { json } from 'express';

const port = 3000;
const app = express();

app.use(express.json());

app.use("*", (req, res, next) => {
    res.status(404).json({ message: `${req.originalUrl} not found` });
})
app.listen(port, () => {
    console.log(`listening on port ${port}`);

})















