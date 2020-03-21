import Networking from "./src/Networking";
import * as io from "./src/socket.io-client.js";

const socket: SocketIOClient.Socket = io("http://localhost:3000");
const networking = new Networking(socket);

networking.initListeners();
networking.startEmittingData();