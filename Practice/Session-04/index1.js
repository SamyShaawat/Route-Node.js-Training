

// http

const http = require("http")


let users = [
    { id: 1, name: "ahmed", age: 25 },
    { id: 2, name: "ali", age: 30 },
    { id: 3, name: "amire", age: 25 },
    { id: 4, name: "aya", age: 27 },
    { id: 5, name: "mohamed", age: 29 },
]


// CRUD operations

let server = http.createServer((req, res, next) => {

    const { url, method } = req

    if (url == "/users" && method == "GET") {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.write(JSON.stringify({ message: "users list", users }))
        res.end()
    } else if (url == "/add" && method == "POST") {
        let newUser = ''
        req.on("data", (chunk) => {
            console.log(JSON.parse(chunk));
            newUser = JSON.parse(chunk)
        })
        req.on("end", () => {
            let index = users.findIndex((user) => {
                return user.id == newUser.id
            })
            if (index == -1) {
                users.push(newUser)
                res.writeHead(200, { "Content-Type": "application/json" })
                res.write(JSON.stringify({ message: "user added", users }))
                res.end()
            } else {
                res.writeHead(409, { "Content-Type": "application/json" })
                res.write(JSON.stringify({ message: "user already exist " }))
                res.end()
            }
        })
    } else if (url == "/update" && method == "PATCH") {
        let userData = ''
        req.on("data", (chunk) => {
            userData = JSON.parse(chunk)
        })
        req.on("end", () => {

            let index = users.findIndex((user) => {
                return user.id == userData.id
            })
            if (index == -1) {
                res.writeHead(404, { "Content-Type": "application/json" })
                res.write(JSON.stringify({ message: "user not exist " }))
                res.end()
            } else {
                users[index].age = userData.age
                res.writeHead(200, { "Content-Type": "application/json" })
                res.write(JSON.stringify({ message: "user updated", user: users[index] }))
                res.end()

            }

        })

    } else if (url == "/delete" && method == "DELETE") {
        let userData = ''
        req.on("data", (chunk) => {
            userData = JSON.parse(chunk)
        })
        req.on("end", () => {

            let index = users.findIndex((user) => {
                return user.id == userData.id
            })
            if (index == -1) {
                res.writeHead(404, { "Content-Type": "application/json" })
                res.write(JSON.stringify({ message: "user not exist " }))
                res.end()
            } else {
                users.splice(index, 1)
                res.writeHead(200, { "Content-Type": "application/json" })
                res.write(JSON.stringify({ message: "user deleted", users }))
                res.end()

            }

        })

    } else {
        res.writeHead(404)
        res.write(JSON.stringify({ message: "404 page not found" }))
        res.end()
    }



})

server.listen(3000, () => {
    console.log("server is running");

})
