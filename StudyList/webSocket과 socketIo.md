# 시작하기 전에

Http는 기본적으로 비연결성을 지향하고, 이전 정보를 가지고 있지 않은 무상태성(stateless)으로 각각의 요청이 독립된 트랜잭션으로 취급되는 통신 프로토콜이다.
즉 요청과 응답 두가지로 구분된 통신 프로토콜이며, 응답 이후에 연결을 끊어버리는 단방향 통신이다.

앞으로 소개할 기능들은 http 한계에서 벗어나 Real-time communication (RTC, 실시간 양방향) 웹 어플리케이션을 구현할 수 있게 도와준다. 최초에 http 프로토콜로 접속이 이루어진 이후에는 ws 프로토콜을 통해 같은 라인을 계속 사용한다.

그렇기 떄문에 불필요한 http와 tcp 트래픽을 최소화 할 수 있다. 웹소켓은 양방향 통신으로 이루어진다.

# WebSocket

클라이언트(브라우저)와 서버사이의 양방향 연결을 제공하는 HTML5에서 제공하는 통신 프로토콜이다. WebSocket API를 활용해 요청 없이 응답을 받아오는 것이 가능하다.

Nodejs 기반에서 충분히 활용이 가능하다.

# SocketIO

SocketIO는

### SocketIO 셋팅

#### 서버 소스코드

```js
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
let server = http.createServer(app);
let io = new Server(server);

server.listen(3000);
```

#### 클라이언트 소스 코드

```html
<head>
  <meta .... />
  <script src="/socket.io/socket.io.js"></script>
  <script>
    //source code
  </script>
</head>

<body>
  <!-- 바디에다 script 태크 작성해도됨 -->
</body>
```

```js
const chat_form = document.querySelector('.chatform-box');
const input = document.querySelector('.input-text');
const text_box = document.querySelector('.text-box');
// import { io } from 'socket.io-client';

/* 클라이언트 연결 */
let socket = io();  //socket.io 서버에 연결

socket.on('connect', () => {
  console.log('클라이언트 연결 성공');
});

input.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!input.value) {
    socket.emit('error ');
  }
  console.log(e);
  /* message 이벤트 발생 */
  socket.emit('message', input.value);

  input.value = '';
});

socket.on('disconnect', () => {
  console.log('클라이언트 닫기 성공')
}
```

### SocketIO 옵션

- 브로드캐스트
  나 자신을 제외한 모두에게 메세지를 보낸다.(네트워크의 브로드캐스트라고 생각)
  `socket.broadcast.emit('이벤트명', '메세지')`

- 특정인에게
  `io.to(socketid).emit('이벤트명', '메세지)`

### SocketIO NameSpace

sockeio에도 namespace라는 개념이 있는데, 서로 다른 엔드포인트, path를 할당할 떄 사용한다. Default Namespace는 `/` 을 사용한다.

#### 사용자지정 Namespace

- 서버

```js
let newRoom = io.of('/chat_room');

newRoom.on('connection', (socket) => {
  console.log('enjoy chat');
});

nswRoom.emit('인삿말', '안녕하세요! 반갑습니다.');
```

- 클라이언트
  지정된 Namespace로 접속한다.

```js
let newRoom = io('/chat_room');
```

#### ROOM

Room은 네임스페이스 안에 특정한 채널을 구현한다. 말 그대로 채팅방이라 생각하면 되고, `Join`과 `Leave`를 활용하여 ROOM을 왔다갔다 할 수 있다.

ROOM은 백엔드에서 관리한다.

- `socket.join()`
  특정 룸 접속

```js
io.on('connection', (socket) => {
  socket.join('room');
});
```

- `io.to(room).emit('이벤트', 내용)`

같은 룸 내에 존재하는 사용자들에게 통신

```js
io.to('room').emit('message', '메세지');
```

- `socket.leave()`

- 서버

- 클라이언트
