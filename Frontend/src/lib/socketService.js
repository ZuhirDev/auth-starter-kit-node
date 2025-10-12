import { apiConfig } from "@/config/config";
import { io } from "socket.io-client";

class SocketService {
  constructor() {
    if (!SocketService.instance) {
      this.socket = null;
      SocketService.instance = this;
    }
    return SocketService.instance;
  }

  init(token = null) {
    if (this.socket) return;

    this.socket = io(apiConfig.API_URL, {
      withCredentials: true,
      auth: token ? { token } : undefined,
    });

    this.socket.on("connect", () => {
      console.log("Conectado a Socket.IO:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("Desconectado de Socket.IO");
    });
  }

  joinRoom(roomName) {
    if (!this.socket) throw new Error("Socket no inicializado");
    this.socket.emit("join", roomName);
  }

  leaveRoom(roomName) {
    if (!this.socket) return;
    this.socket.emit("leave", roomName);
  }

  on(event, callback) {
    if (!this.socket) return;
    this.socket.on(event, callback);
  }

  emit(event, data) {
    if (!this.socket) return;
    this.socket.emit(event, data);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

const socketService = new SocketService();
export default socketService;
