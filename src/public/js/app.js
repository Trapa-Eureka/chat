const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
// 어디에 있는지 알려주는 것 (같은 url)
// app.js socket : 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handleOpen() {
    console.log("connected with Server");
}
function handleMessage(message) {
    // console.log("New message : ", message.data);
    const li = document.createElement("li"); // create li when receive new message
    li.innerText = message.data; // li에 메세지를 출력
    messageList.append(li); // messageList에 li를 추가
}
function handleDisconnect() {
    console.log("disconnected from Server");
}

// socket이 open 되었을 때 브라우저에 연결되었다고 메세지 출력
socket.addEventListener("open", handleOpen);
socket.addEventListener("message", handleMessage);
socket.addEventListener("close", handleDisconnect);

// chat으로 보내지는 이벤트
function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

// nickname 설정시 이벤트
function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);