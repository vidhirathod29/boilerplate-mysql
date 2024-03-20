const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sql-boilerplate',
});

connection.connect((err) => {
  if (err) {
    console.log(`Couldn't connect to database`);
  } else {
    console.log('Database Connected..');
  }
});

module.exports = connection;
