// 어디에 있는지 알려주는 것 (같은 url)
// app.js socket : 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`);