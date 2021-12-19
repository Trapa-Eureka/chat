import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on port 3000");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
    console.log("disconnected from the browser"); // 웹소켓 연결이 끊어졌을 때 콘솔에 출력
}
function onSocketMessage(message) {
    console.log(message.toString()); // 웹소켓으로 부터 메세지가 왔을 때 콘솔에 출력
}

// socket : 연결된 브라우저
wss.on("connection", (socket) => {
    console.log("connected with browser");
    socket.on("close", onSocketClose);
    socket.on("message", onSocketMessage);
    socket.send("hello!");
});

server.listen(3000, handleListen);