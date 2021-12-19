# Zoom Study

Zoom clone using NodeJS WebRTC and WebSockets

- front, backend에서 websocket의 real-time 역할
- Websocket에서 front-end가 back-end로 real-time으로 뭔가 보낼 수 있는 방법이 있다(반대의 경우도 당연히 가능)
- 서로다른 브라우저들 사이에도 대화가 오고갈 수 있게끔
- 메시지를 구별해주는 방법. 타입별 설정. (msg chat type, nickname type)
- JS object를 가지고 string으로 만드는 가장 좋은 방법
- 이 string을 다시 JS object로 만드는 방법