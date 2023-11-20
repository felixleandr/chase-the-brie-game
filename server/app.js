require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3000;

const { connect } = require("./config/mongo");
const cors = require("cors");
const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (_, res) => res.json("Welcome to our server"));

app.use(router);

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
  ],
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinRoom", ({ roomId, access_token }) => {
    console.log(`A user joined the room ${roomId}`);
    console.log(roomId, access_token);
    socket.join(roomId);
  });

  socket.on("playGame", (roomData) => {
    console.log(roomData);
    socket.broadcast.to(roomData.roomId).emit("playGame", roomData);
  });
});

connect().then((db) => {
  console.log("success to connect to mongo");
  server.listen(port, () => {
    console.log("app connected to " + port);
  });
});
