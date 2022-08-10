'use strict';
/* Importing the mysql module. */
const mysql = require('mysql');
/* Creating a connection to the database. */
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Arpit@2101',
  database: 'node_mysql_crud_db'
});
/* This is a callback function. It is called when the connection is established. */
dbConn.connect(function (err) {
  if (err) console.log("Connection Failed", '\n', err.message);
  else console.log("Database Connected!");
});
/* Exporting the `dbConn` object so that it can be used in other files. */
module.exports = dbConn;