import connection from "../../DB/connectionDB.js";

export const signUp = (req, res) => {
    const { email, firstName, lastName, role, password } = req.body;
    connection.execute(`select * from users where email = '${email}'`, (err, result) => {
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


export const logIn = (req, res) => {
    const { email, password } = req.body;

    connection.execute(`select * from users where email = '${email}'`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on select query', error: err.message });
        }

        if (result.length == 0) {
            return res.status(400).json({ message: 'User not found' });
        }
        // console.log(result);
        const user = result[0];
        // console.log(user.password);
        if (user.password == password) {
            return res.status(200).json({ message: 'Done, logged in.' });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    });
};

export const alterTable = (req, res) => {
    const { email } = req.body;
    connection.execute(`SELECT role FROM users WHERE email = '${email}'`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on select query', error: err.message });
        }

        if (result.length == 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (result[0].role != 'admin') {
            return res.status(403).json({ message: "You don't have access." });
        }

        connection.execute(`ALTER TABLE users ADD createdAt TIMESTAMP DEFAULT NOW()`, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error on alter query', error: err.message });
            }
            return res.status(200).json({ message: 'Done, Table altered successfully' });
        });
    });
};

export const truncateTable = (req, res) => {
    const { email } = req.body;
    connection.execute(`SELECT role FROM users WHERE email = '${email}'`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on select query', error: err.message });
        }
        if (result.length == 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (result[0].role != 'admin') {
            return res.status(403).json({ message: "You don't have access." });
        }
        connection.execute(`SET foreign_key_checks = 0;`, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error on set query', error: err.message });
            }
            connection.execute(`DELETE FROM user_products`, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error on delete query', error: err.message });
                }
                connection.execute(`TRUNCATE TABLE products`, (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error on truncate query', error: err.message });
                    }
                    res.status(200).json({ message: 'Done, Product table truncated successfully.' });
                });
            });
        });
    });
};