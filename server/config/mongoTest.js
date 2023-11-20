// const { MongoClient } = require("mongodb");

// const uri =  process.env.MONGO_TESTING_URI || "mongodb://127.0.0.1:27017" ;

// const client = new MongoClient(uri);

// let db;
// async function connect() {
//   try {
//     await client.connect();
//     db = client.db("ChaseTheBrie_test");
//   } catch (err) {
//     console.log(err);
//   }
// }

// function getDb() {
//   return db;
// }

// module.exports = { connect, getDb };

const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_TESTING_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });
});
