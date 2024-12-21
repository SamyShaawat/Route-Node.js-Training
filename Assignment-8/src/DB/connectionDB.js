import mysql from "mysql2"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'assignment-7',
    port: 4306
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
    } else {
        console.log(`Connected to MySQL Database: assignment-7`);

    }
})

export default connection;