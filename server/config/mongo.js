const { MongoClient } = require("mongodb");
require("dotenv").config();

const env = process.env.NODE_ENV || 'development';

let uri;
// console.log(process.env.MONGO_TESTING_URI);

if(env === 'test') {
  uri = process.env.MONGO_TESTING_URI
} else {
  uri =  process.env.MONGO_CONNECTION 
}

const client = new MongoClient(uri);

let db;
async function connect() {
  console.log('masuk sini');
  try {
    console.log('masuk sini juga');
    await client.connect();
    console.log('test');
    db = client.db("ChaseTheBrie");
    console.log(db, '>>>>');
  } catch (err) {
    console.log(err, 'ini error');
  }
}

function getDb() {
  return db;
}

module.exports = { connect, getDb };
