const http = require('http');
let users = [
    {
        id: 1,
        name: 'John',
        age: 21
    },
    {
        id: 2,
        name: 'Samy',
        age: 22
    },
    {
        id: 3,
        name: 'Omar',
        age: 23
    },
    {
        id: 4,
        name: 'Ali',
        age: 24
    }
]
http.createServer((req, res, next) => {
    // console.log(req.url, req.method);
    // res.writeHead(200, "ok", { 'Content-Type': 'text/html ' });
    // res.write("<h1> Hello World </h1");
    // return res.end("end of the request");
    // ----------------------------------------------------------------
    if (req.method === 'GET' && req.url === "/users") {
        res.writeHead(200);
        res.write(JSON.stringify({ message: "done", users }));
        res.end()
    } else if (req.method === 'POST' && req.url === "/add") {
        let newUser = '';
        req.on("data", (chunk) => {
            console.log(JSON.parse(chunk));
            newUser = JSON.parse(chunk);
        })

        req.on("end", () => {
            let index = users.findIndex((user) => {
                return user.id == newUser.id;
            })
            if (index == -1) {
                users.push(newUser);
                res.writeHead(200);
                res.write(JSON.stringify({ message: "done", users }));
                res.end();
            } else {
                res.writeHead(409);
                res.write(JSON.stringify({ message: "user already exist" }));
                res.end();
            }
        })
    } else if (req.method === 'PATCH' && req.url === "/update") {
        let data = '';
        req.on("data", (chunk) => {
            console.log(JSON.parse(chunk));
            data = JSON.parse(chunk);
        })

        req.on("end", () => {
            let index = users.findIndex((user) => user.id == data.id);
            if (index == -1) {
                res.writeHead(404);
                res.write(JSON.stringify({ message: "user not found" }));
                res.end();
            } else {
                users[index].age = data.age;
                res.writeHead(200);
                res.write(JSON.stringify({ message: "", user: users[index] }))
            }
        })
    } else if (req.method === 'DELETE' && req.url === "/delete") {
        let data = '';
        req.on("data", (chunk) => {
            console.log(JSON.parse(chunk));
            data = JSON.parse(chunk);
        })

        req.on("end", () => {
            let index = users.findIndex((user) => user.id == data.id);
            if (index == -1) {
                res.writeHead(404);
                res.write(JSON.stringify({ message: "user not found" }));
                res.end();
            } else {
                users.splice(index, 1);
                res.writeHead(200);
                res.write(JSON.stringify({ message: "", users }))
            }
        })
    }

}).listen(8000, () => {
    console.log("server is running on port 8000");
})