const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("client"));

let documentText = "";

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected");

  // Send current doc
  socket.emit("load-document", documentText);

  // Receive changes
  socket.on("send-changes", (data) => {
    documentText = data;
 socket.broadcast.emit("receive-changes", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
