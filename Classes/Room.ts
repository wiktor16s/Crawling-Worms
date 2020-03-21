import * as SocketIo from "socket.io";

class Room {
  io: SocketIo.Server;
  users: Array<String>;

  constructor(io: SocketIo.Server) {
    this.io = io;
    this.users = [];
  }

  addUser(socket : SocketIo.Socket) {
    this.users.push(socket.id);
    this.io.emit("playersListUpdate", this.users);
  }

  removeUser(socket : SocketIo.Socket) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i] === socket.id) {
        console.log("removed");
        this.users.splice(i, 1);
        this.io.emit("playersListUpdate", this.users);
        return;
      }
    }
  }
}

export default Room;
