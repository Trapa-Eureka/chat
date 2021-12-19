// 어디에 있는지 알려주는 것 (같은 url)
// app.js socket : 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
    console.log("connected with Server");
}
function handleMessage(message) {
    console.log("New message : ", message.data);
}
function handleDisconnect() {
    console.log("disconnected from Server");
}

// socket이 open 되었을 때 브라우저에 연결되었다고 메세지 출력
socket.addEventListener("open", handleOpen);
socket.addEventListener("message", handleMessage);
socket.addEventListener("close", handleDisconnect);
setTimeout(() => {
    socket.send("hello from the browser");
}, 10000);