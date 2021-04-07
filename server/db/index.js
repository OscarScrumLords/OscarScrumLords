const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'bike'
});

/*
TO GRAB THIS DB
mysql.server start
In a separate terminal CD into server folder
then mysql -u root < schema.sql
run mysql -u root
show databases
use bike
show tables
*/

//testing
module.exports = {
  db
};
