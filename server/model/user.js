const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");
const bcrypt = require("bcrypt");

class User {
  static async findAll() {
    try {
      const users = getDb().collection("users");
      const data = await users
        .find({}, { projection: { password: 0 } })
        .toArray();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async findById(_id) {
    try {
      const users = getDb().collection("users");
      const user = await users.findOne({ _id: new ObjectId(_id) });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const users = getDb().collection("users");
      const user = await users.findOne({ email: email });
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async postUser(user) {
    try {
      // const users = getDb().collection("users");
      // // Pastikan properti password ada dan memiliki nilai
      // if (!user.password) {
      //   throw new Error("Password is required");
      // }
      // // Hash the password
      // const hashedPassword = await bcrypt.hash(user.password, 10);
      // const userToInsert = {
      //   ...user,
      //   password: hashedPassword,
      // };
      // const result = await users.insertOne(userToInsert);
      // return { id: result.insertedId, ...user };
      const users = getDb().collection("users");

      const newUser = await users.insertOne(user);
      return await users.findOne({
        _id: new ObjectId(newUser.insertedId),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteUser(_id) {
    try {
      const user = getDb().collection("users");
      const data = await user.deleteOne({
        _id: new ObjectId(_id),
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = User;
