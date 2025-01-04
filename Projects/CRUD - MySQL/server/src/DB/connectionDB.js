import mysql from "mysql2"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'crud-app-mysql',
    port: 4306
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
    } else {
        console.log(`Connected to MySQL Database: crud-app-mysql`);

    }
})

export default connection;