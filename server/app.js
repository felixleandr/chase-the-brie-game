require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { connect } = require("./config/mongo");
const cors = require("cors");
const router = require("./routes");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_, res) => res.json("Welcome to our server"));

app.use(router);

// app.patch('/cors', (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Server,Date,access-control-allow-methods,access-control-allow-origin");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
//   res.send('ok')
// })
// app.options('/*', (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Server,Date,access-control-allow-methods,access-control-allow-origin");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
//   res.send('send some thing whatever')
// })


io.on("connection", (socket) => {
    console.log("a user connected");
  
    socket.on("joinRoom", ({ roomId, access_token, player }) => {
      console.log(`A user joined the room ${roomId}`);
      console.log(roomId, access_token);
      socket.join(roomId);
      socket.nsp.to(roomId).emit("joinRoom", player);
    });
  
    socket.on("playGame", (roomData) => {
      console.log(roomData);
      socket.broadcast.to(roomData.roomId).emit("playGame", roomData);
    });

    socket.on('updatePlayer', ({newPlayers, roomId})=> {
        console.log(newPlayers, 'dari server');
        socket.broadcast.to(roomId).emit("updatePlayer", newPlayers);
    });

    socket.on("changePosition", (payload) => {
        console.log(payload, "di server");
        socket.broadcast.to(payload.roomId).emit("changePosition", payload);
      });

    socket.on('playerWinAnnouncement', ({currentPlayerName, roomId})=> {
      console.log(currentPlayerName, roomId, 'server emit');
      socket.broadcast.to(roomId).emit('playerWinAnnouncement', currentPlayerName)
    })
  });
  
  connect().then((db) => {
    console.log("success to connect to mongo");
    server.listen(port, () => {
      console.log("app connected to " + port);
    });
  });

// app.listen(port, () => {
//       console.log("app connected to " + port);
//     });

// connect().then((db) => {
//     console.log("success to connect to mongo");
//     app.listen(port, () => {
//       console.log("app connected to " + port);
//     });
// });

module.exports = app

