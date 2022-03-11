const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewDetail(firstName, lastName, emailAddress) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (firstName, lastName, emailAddress) VALUES (?,?,?);";

                connection.query(query, [firstName, lastName, emailAddress] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                userID : insertId,
                firstName : firstName,
                lastName : lastName, 
                emailAddress : emailAddress
            };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;