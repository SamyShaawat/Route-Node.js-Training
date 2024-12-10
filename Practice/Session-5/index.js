const express = require('express');

const app = express();

const path = require('path');

let users = [
    { id: 1, name: "ahmed", age: 25 },
    { id: 2, name: "ali", age: 30 },
    { id: 3, name: "amire", age: 25 },
    { id: 4, name: "aya", age: 27 },
    { id: 5, name: "mohamed", age: 29 },
]

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// app.get("/", (req, res, next) => {
//     return res.status(200).send({ msg: "Hello World!" })
// })

app.get("/html", (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/", (req, res, next) => {
    res.status(200).send({ msg: "done", users });
})

app.post("/", (req, res, next) => {
    let index = users.findIndex(user => user.id == req.body.id);
    if (index == -1) {
        users.push(req.body);
        return res.status(201).json({ msg: "User added Successfully", users });
    }
    return res.status(409).json({ msg: "User with this id already exists" });
})

app.put("/", (req, res, next) => {
    let index = users.findIndex(user => user.id == req.body.id);
    if (index == -1) {
        users.push(req.body);
        return res.status(201).json({ msg: "User added Successfully", users });
    }
    return res.status(409).json({ msg: "User with this id already exists" });

})

app.delete("/", (req, res, next) => {
    if (index == -1) {
        return res.status(409).json({ msg: "User not exists" });
    }
    users.splice(index, 1)
    return res.status(201).json({ msg: "User deleted", users });

})

app.use("*", (req, res, next) => {
    return res.status(404).json({ msg: "Page not found" });
})

const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);

})
