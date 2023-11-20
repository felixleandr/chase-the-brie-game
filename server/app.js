require("dotenv").config();
const express = require("express");
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server);

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

const rooms = {
  roomCode: "test123",
  maze: {},
  players: [
    // {
    //   id: 1,
    //   name: "luqy",
    //   x: 0,
    //   y: 0
    // },
    // {
    //   id: 2,
    //   name: "ary",
    //   x: 0,
    //   y: 100
    // }
  ]
}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("startGame", (roomData) => {
    socket.broadcast.to(roomData.roomCode).emit('playGame',rooms)
  })
});

connect().then((db) => {
    console.log("success to connect to mongo");
    app.listen(port, () => {
      console.log("app connected to " + port);
    });
});

