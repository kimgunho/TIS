const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected To Server open");
});

socket.addEventListener("message", (msg) => {
  console.log("got this", msg.data);
});

socket.addEventListener("close", () => {
  console.log("disconnected To Server X");
});
