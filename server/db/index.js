const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'bike'
});

db.connect((err, res) => {
  if (err) {
    return console.error('FAILURE');
  }
  return console.log('Connected to bikeAround', res.connectionId);
});

module.exports = {
  db
};
