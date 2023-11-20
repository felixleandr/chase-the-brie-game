require("dotenv").config();
require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { connect } = require("./config/mongo");
const cors = require("cors");
const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (_, res) => res.json("Welcome to our server"));

app.use(router);

// app.listen(port, () => {
//       console.log("app connected to " + port);
//     });

connect().then((db) => {
    console.log("success to connect to mongo");
    app.listen(port, () => {
      console.log("app connected to " + port);
    });
});

