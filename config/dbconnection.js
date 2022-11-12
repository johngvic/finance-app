const mysql = require('mysql');

const host = 'localhost';
const user = 'root';
const password = '010100';
const database = 'financeapp';

module.exports = () => {
  return dbConnection = mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true
  })
}