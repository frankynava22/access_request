const sqlite3 = require('sqlite3').verbose();

let db = null;

function connectDB() {
  db = new sqlite3.Database('information.db', function (err) {
    if (err) throw err;
    const query = `CREATE TABLE IF NOT EXISTS information (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      first_name TEXT NOT NULL,
      middle_initial TEXT,
      last_name TEXT NOT NULL,
      date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    db.run(query, function (err) {
      if (err) throw err;
    });
  });
}

function disconnectDB() {
  if (db) {
    db.close(function (err) {
      if (err) throw err;
    });
  }
}

function getDB() {
  if (!db) {
    connectDB();
  }
  return db;
}

module.exports = {
  connectDB,
  disconnectDB,
  getDB,
};
