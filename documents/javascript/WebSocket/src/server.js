import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("listen on http://localhose:3000");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  socket.on("close", () => console.log("disconnected from browser"));
  socket.send("hello");
});

server.listen(3000, handleListen);
