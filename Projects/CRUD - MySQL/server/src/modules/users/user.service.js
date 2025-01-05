import connection from "../../DB/connectionDB.js";

export const getAllUsers = (req, res) => {
    const sql = `SELECT * FROM users`;
    connection.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" })
        return res.json(result);
    })
};

