const socket = io();
const editor = document.getElementById("editor");

// Load document
socket.on("load-document", (data) => {
  editor.value = data;
});

// Send changes
editor.addEventListener("input", () => {
  socket.emit("send-changes", editor.value);
});

// Receive changes
socket.on("receive-changes", (data) => {
  editor.value = data;
});