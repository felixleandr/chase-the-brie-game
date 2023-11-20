const {MongoClient} = require('mongodb');
const {connect} = require('../config/mongo')

  let connection;
  let db;

  beforeAll(async () => {
    try {
        await connect()
        console.log("success to connect to mongo - testing");
        
    } catch (err) {
        console.log(err, '<<<<< nando');
        
    }


    // connection = await MongoClient.connect(global.__MONGO_URI__, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // db = await connection.db();
  });
 


describe('POST /pub/register', function() {
	it('should response with message Customer with email <email> is registered, data id and email', async() => {
		// const response = await request(app)
		// .post('/pub/register')
		// .send({
		// 	email: "felixia@gmail.com",
		// 	password: "felix"
		// })

		// expect(response.status).toBe(201)
		// expect(response.body).toHaveProperty('message', expect.any(String))
		// expect(response.body).toHaveProperty('id', expect.any(Number))
		// expect(response.body).toHaveProperty('email', expect.any(String))
	})
})