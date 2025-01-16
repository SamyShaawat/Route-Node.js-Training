import connection from "../../DB/connectionDB.js";

export const getAllUsers = (req, res) => {
    const sql = `SELECT * FROM users`;
    connection.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" })
        return res.json(result);
    })
};

export const createUser = (req, res) => {
    const { name, email, age, gender } = req.body;
    const sql = `INSERT INTO users (name, email, age, gender) VALUES('${name}', '${email}', '${age}', '${gender}')`;
    connection.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
};

export const readUser = (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM users where id = '${id}'`;
    connection.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" })
        return res.json(result);
    })
};


