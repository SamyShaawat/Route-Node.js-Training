import connection from './connectionDB.js';


export const createUsersTable = (req, res) => {
    connection.execute(
        `
        CREATE TABLE IF NOT EXISTS users (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        role VARCHAR(50),
        password VARCHAR(255) NOT NULL
        );`,
        (err, results) => {
            if (err) {
                res.status(500).send('Error creating users table');
            } else {
                res.status(200).send('Users table created or already exists');
            }
        });
};

export const createUserPhones = (req, res) => {
    connection.execute(
        `
        CREATE TABLE IF NOT EXISTS user_phones (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        user_id INT(11),
        phone VARCHAR(15),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`,
        (err, results) => {
            if (err) {
                res.status(500).send('Error creating user_phones table');
            } else {
                res.status(200).send('User_phones table created or already exists');
            }
        });
};

export const createProductsTable = (req, res) => {
    connection.execute(
        `
        CREATE TABLE IF NOT EXISTS products (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        stock INT DEFAULT 0,
        isDeleted BOOLEAN DEFAULT false,
        price DECIMAL(10,2) NOT NULL,
        userId INT(11),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`,
        (err, results) => {
            if (err) {
                res.status(500).send('Error creating products table');
            } else {
                res.status(200).send('Products table created or already exists');
            }
        });
};

export const createUsersProducts = (req, res) => {

    connection.execute(
        `
        CREATE TABLE IF NOT EXISTS users_products (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        user_id INT(11),
        product_id INT(11),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );`,
        (err, results) => {
            if (err) {
                res.status(500).send('Error creating users_products table');
            } else {
                res.status(200).send('Users_products table created or already exists');
            }
        });
};


export const createTables = (req, res) => {
    return res.status(200).json({ message: 'Tables created successfully.' });
};
