import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import users from './usersData.json' assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saveChangesToJsonFile = () => {
    const filePath = path.resolve(__dirname, './usersData.json'); 
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
};


export let getAllUsers = (req, res, next) => {
    res.status(200).send({ msg: "done", users });
}

// Task 1.1: URL: POST /addUser
export let addUser = (req, res, next) => {
    const { id, name, age, email } = req.body;
    let index = users.findIndex(user => user.email == email);
    if (index == -1) {
        users.push({ id, name, age, email });
        saveChangesToJsonFile();
        return res.status(201).json({ msg: "User added Successfully", users });
    }
    return res.status(409).json({ msg: "Email already exists." });
}

// Task 1.2: URL: PATCH /updateUser/:id
export let updateUser = (req, res, next) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    let index = users.findIndex(user => user.id == id);
    if (index == -1) {
        return res.status(409).json({ msg: "User id not found." });
    }
    users[index].name = name;
    users[index].age = age;
    users[index].email = email;
    saveChangesToJsonFile();
    return res.status(201).json({ msg: "User updated Successfully", user: users[index] });

}
// Task 1.3: URL: DELETE /deleteUser/:id
export let deleteUser = (req, res, next) => {
    const { id } = req.params;
    let index = users.findIndex(user => user.id == id);
    if (index == -1) {
        return res.status(409).json({ msg: "User id not found." });
    }
    users.splice(index, 1);
    saveChangesToJsonFile();
    return res.status(201).json({ msg: "User deleted successfully.", users });
}

// Task 1.4: URL: GET /getUserByName
export let getUserByName = (req, res, next) => {
    const { name } = req.query;
    const user = users.find(user => user.name == name);

    if (user) {        
        return res.status(200).json({ msg: "User name found", user });
    }

    
    return res.status(404).json({ msg: "User name not found" });
}

// Task 1.5: URL: GET /getUserByID
export let getUserByID = (req, res, next) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id == id);

    if (index == -1) {
        return res.status(404).json({ msg: "User Id not found" });
    }
    return res.status(200).json({ msg: "User found", user: users[index] });
}

