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

const sockets = [];

// socket : 연결된 브라우저
wss.on("connection", (socket) => {
    sockets.push(socket); // 다른 브라우저가 연결 되었을때 해당 브라우저를 이 array에 추가(넣는다.) 때문에 받은 메세지를 다른 모든 socket에 전달해 줄 수 있음
    socket["nickname"] = "Unknown"; // nickname이 없을때 
    console.log("connected with browser");
    socket.on("close", onSocketClose);
    socket.on("message", (msg) => { // 웹소켓으로 부터 메세지가 왔을 때 출력
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach(aSocket => 
                    aSocket.send(`${socket.nickname}: ${message.payload}`)
                );
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
});

server.listen(3000, handleListen);