import * as express from "express";
import * as path from "path";
import * as socketio from "socket.io";
import Room from "./classes/Room";

const app = express();
const server = require("http").createServer(app);
const IO = require("socket.io")(server);
const publicDirectoryPath = path.join(__dirname, "./public");

const room: Room = new Room(IO);
const FPS: number = 6;

app.use(express.static("public"));

IO.on("connection", (socket: socketio.Socket) => {

  console.log("new socket connected ", socket.id);
  room.addUser(socket);

  socket.on("playerData", (data: any) => {
    //! todo
    socket.broadcast.emit("otherPlayerData", data);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected ", socket.id);
    room.removeUser(socket);
  });
});

let gameLoop = setInterval(() => {
  IO.emit("tick");
}, 1000 / FPS);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Server is running..."));
