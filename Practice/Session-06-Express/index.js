const express = require('express');
const postRouter = require('./posts/posts.routes.js');
const userRouter = require('./users/users.routes.js');
const port = 3000;
const app = express();


app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.use("*", (req, res, next) => {
    res.status(404).json({ message: `${req.originalUrl} not found` });
})
app.listen(port, () => {
    console.log(`listening on port ${port}`);

})















