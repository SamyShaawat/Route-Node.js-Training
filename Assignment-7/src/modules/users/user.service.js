import connection from "../../DB/connectionDB.js";

export const signUp = (req, res) => {
    const { email, firstName, lastName, role, password } = req.body;
    connection.execute(`select email from users where email = '${email}'`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on select query', error: err.message });
        }
        if (result.length > 0) {
            return res.status(409).json({ message: 'Email already exists.' });
        }

        connection.execute(`insert INTO users (email, firstName, lastName, role, password)
                            VALUES ('${email}', '${firstName}', '${lastName}', '${role}', '${password}')`,
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error on insert query', error: err.message });
                }
                // console.log(result);
                if (result.affectedRows > 0) {
                    res.status(201).json({ message: 'User created successfully.', userId: result.insertId, });
                } else {
                    res.status(400).json({ message: 'Failed to create the user' });
                }
            });
    });
};



export const getUsers = async (req, res, next) => {
    try {
    } catch (error) {

    }
}