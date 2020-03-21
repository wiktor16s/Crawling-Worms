import io from "./socket.io-client.js";
import Snake from "./Snake";
import { Color } from "./types";

import { getPlayersData, setPlayersData, getSnake, setSnake } from "./data";
import { draw } from "./drawer";

class Networking {
  socket: SocketIOClient.Socket;
  emitter: NodeJS.Timer;

  constructor(socket: SocketIOClient.Socket) {
    this.socket = socket;
    this.emitter;
  }

  initListeners() {
    this.socket.once("connect", () => {
      this.generateNewSnake(this.socket.id);
      draw();
    });

    this.socket.on("tick", () => {
      draw();
    });

    this.socket.on("playersListUpdate", (data: Array<Snake>) => {
      let newPlayersData: Array<Snake> = getPlayersData().filter(player => {
        for (let eachPlayer of data) {
          return eachPlayer.id == player.id;
        }
      });
      setPlayersData(newPlayersData);
      this.socket.emit("playerData", getSnake());
    });

    this.socket.on("otherPlayerData", (data: Snake) => {
      const playersData: Array<Snake> = getPlayersData();
      const index = getPlayersData().findIndex(x => {
        return x.id == data.id;
      });

      if (index > -1) {
        playersData[index] = data; // update
      } else {
        playersData.push(data); // create
      }
      setPlayersData(playersData);
    });
  }

  startEmittingData(): void {
    this.emitter = setInterval(() => {
      this.socket.emit("playerData", getSnake());
    }, 10);
  }

  generateNewSnake(id: String): void {
    let color: Color = {
      r: Math.floor(Math.random() * 220) + 20,
      g: Math.floor(Math.random() * 220) + 20,
      b: Math.floor(Math.random() * 220) + 20
    };

    setSnake(new Snake(id, color));
    getSnake().initControl();
  }
}

export default Networking;
