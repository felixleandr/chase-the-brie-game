const { hashPass, comparePass, createToken } = require("../helpers/auth");
const User = require("../model/user");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, singlePlayerWin, multiPlayerWin } =
        req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Every field is required" });
      }

      const checkUser = await User.findByEmail(email);
      if (checkUser) {
        return res.status(400).json({ message: "Email is not unique" });
      }

      const newUser = await User.postUser({
        ...req.body,
        password: hashPass(req.body.password),
      });

      res.status(201).json({ message: `${newUser.username} has been added` });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async login(req, res, next) {
    try {
      console.log(2222);
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      const user = await User.findByEmail(email);
      if (!user || !comparePass(password, user.password)) {
        return res.status(401).json({ message: "Invalid email/password" });
      }

      const id = user._id;
      const idString = id.toHexString();

      res
        .status(200)
        .json({ access_token: createToken({ id: idString }), user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async userFindAll(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async userFindOne(req, res) {
    try {
      const { _id } = req.params;
      const user = await User.findById(_id);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.deleteUser(id);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Controller;
