
const { MongoClient } = require('mongodb');
const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_NAME
} = process.env;

const mongoUrl = `mongodb://${DB_HOST}/${DB_NAME}`;
let connection;
async function connectDB() {
  if (connection) return connection;

  let client;
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    connection = client.db(DB_NAME);
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error);
  }
  return connection;
}

module.exports = connectDB;