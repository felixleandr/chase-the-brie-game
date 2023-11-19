const { verifyToken } = require("../helpers/auth");
const  User  = require("../model/user");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token){
      return res.status(401).json({ message: "Invalid Token" });
    }

    const verified = verifyToken(access_token);

    const user = await User.findById(verified.id);
    if (!user){
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = user;

     next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
