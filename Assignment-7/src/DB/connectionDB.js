import mysql from "mysql2"

const Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'assignment-7',
    port: 4306
});

Connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL Database: assignment-7');

    }
})

export default Connection;