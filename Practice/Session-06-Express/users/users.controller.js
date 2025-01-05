let users = [
    { id: 1, name: "ahmed", age: 25 },
    { id: 2, name: "ali", age: 30 },
    { id: 3, name: "amire", age: 25 },
    { id: 4, name: "aya", age: 27 },
    { id: 5, name: "mohamed", age: 29 },
]

let getUsers = (req, res, next) => {
    res.status(200).send({ msg: "done", users });
}

let addUser = (req, res, next) => {
    const { id, name, age } = req.body;
    let index = users.findIndex(user => user.id == id);
    if (index == -1) {
        users.push({ id, name, age });
        return res.status(201).json({ msg: "User added Successfully", users });
    }
    return res.status(409).json({ msg: "User with this id already exists" });
}

let updateUser = (req, res, next) => {
    const { id } = req.params;
    const { name, age } = req.body;
    let index = users.findIndex(user => user.id == id);
    if (index == -1) {
        return res.status(409).json({ msg: "User not exists" });
    }
    users[index].name = name;
    users[index].age = age;
    return res.status(201).json({ msg: "User updated Successfully", user: users[index] });

}

let deleteUser = (req, res, next) => {
    const { id } = req.params;
    let index = users.findIndex(user => user.id == id);
    if (index == -1) {
        return res.status(409).json({ msg: "User not exists" });
    }
    users.splice(index, 1)
    return res.status(201).json({ msg: "User deleted", users });
}
module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}