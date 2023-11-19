const express = require("express");
const router = express.Router();

const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");

router.post("/register", Controller.register);

router.post("/login", Controller.login);

router.use(authentication);

router.get("/users", Controller.userFindAll);

router.get("/users/:id", Controller.userFindOne);

router.delete("/users/:id", Controller.deleteUser);

module.exports = router;
