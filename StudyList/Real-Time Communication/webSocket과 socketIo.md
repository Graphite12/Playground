# 시작하기 전에

Http는 기본적으로 비연결성을 지향하고, 이전 정보를 가지고 있지 않은 무상태성(stateless)으로 각각의 요청이 독립된 트랜잭션으로 취급되는 통신 프로토콜이다.
즉 요청과 응답 두가지로 구분된 통신 프로토콜이며, 응답 이후에 연결을 끊어버리는 단방향 통신이다.

앞으로 소개할 기능들은 http 한계에서 벗어나 Real-time communication (RTC, 실시간 양방향) 웹 어플리케이션을 구현할 수 있게 도와준다. 최초에 http 프로토콜로 접속이 이루어진 이후에는 ws 프로토콜을 통해 같은 라인을 계속 사용한다.

그렇기 떄문에 불필요한 http와 tcp 트래픽을 최소화 할 수 있다. 웹소켓은 양방향 통신으로 이루어진다.

# WebSocket

클라이언트(브라우저)와 서버사이의 양방향 연결을 제공하는 HTML5에서 제공하는 통신 프로토콜이다. WebSocket API를 활용해 요청 없이 응답을 받아오는 것이 가능하다.

Nodejs 기반에서 충분히 활용이 가능하다.

# SocketIO

SocketIO는 보다 넓은 스펙트럼의 양방향 통신을 구축하는 라이브러리이다. 넓은 스펙트럼이라는 것은 웹 소켓은 html5에서 추가된 프로토콜이며 오래된 브라우저에서는 지원을 하지 않는다.

그러므로 브라우저 호환에 대해서 고민하지 않고도 충분히 양방향 통신구축이 가능한게 `socket io`이다.

### SocketIO 알아야할 속성들

`Socket IO`를 사용하기 위해 미리 숙지해야할 속성들이 존재한다. 최초 접속은 무조건 `http` 프로토콜로 접속하여 `ws`프로토콜로 통신하게 되는데 주고 받기, 특정 클라이언트 혹은 특정 클라이언트를 제외한 모든 기능들을 알아야한다.

### Server.js

```js
io.on(connection, (socket) => {
  //statement
});
```

클라이언트에서 채팅하기를 클릭하게 되면 `socket.io` 서버에 접속한다.

접속하게되면 `io.on(connection,)` 즉, 커넥션 이벤트가 발생하면서 이벤트 헨들러를 실행한다. 여기서 공식홈페이지에서도 나와있듯이 `socket`을 인자로 받기로 약속 되어있다.(헷갈리지만 않는다면 원하는 이름으로 작성가능)

### Client.js

이제 사용자는 채팅 서버에 연결되었다. 그러나 아직 채팅을 사용할 준비가 안되었다. 그러면 어떻게 해야되나? 클라이언트는 서버와 하나의 소켓에 연결되어있다. 요청과 응답이후에도 연결이 지속된다. 그러면 실시간 통신을 위해선 클라이언트에서도 서버에게 어떠한 이벤트를 보내줘야한다.

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  let socket = io();
</script>
```

`socket.io` 서버가 가동되면 자동적으로 `socket.io.js`를 생성하여 연결해주기 떄문에 추가적인 `Path`를 작성해줄 필요가 없다.

실제 로컬 경로는 이렇다
`node_modules/socket.io/client-dist/socket.io.js`

`ES6` 모듈을 사용하려면 다음과 같다.

```js
<script type="module">
  import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js"; const
  socket = io();
</script>
```

이것으로 시작준비는 마무리가 되었다. 이제 본격적으로 통신을 위한 속성들을 알아보자

- **socket.io 속성**

* SC: 서버와 클라이언트 공통
* C : 클라이언트에서만 작성
* S : 서버에서만 작성

- 이벤트 수신 (SC)
  `socket.on('받은 이벤트명', 이벤트 핸들러 함수)`

socket.on은 해당 클라이언트의 특정 이벤트를 수신할 때 주로 쓴다. 첫번째 인자로 받을 이벤트명, 두번째로는 이벤트를 처리할 핸들러를 작성해준다.

- 이벤트 송신 (SC)
  `socket.emit('보낼 이벤트명', 이벤트 핸들러 함수)`

socket.emit은 해당 클라이언트의 특정 이벤트를 송신할 떄 주로 쓰인다.
첫번째 인자로 보낼 이벤트명, 두번째 인자로 이벤트를 처리할 핸들러를 작성해준다.

- 지목된 클라이언트를 제외한 모든 클라이언트에게 전송 (S)
  `socket.broadcast.emit('보낼 이벤트명', 이벤트 헨들러 함수)`

- 특정 클라이언트에게만 전송 (S)
  `io.to(clientID).emit('보낼 이벤트명', 이벤트 헨들러 함수)`

위 정보를 바탕으로 어떻게 통신이 되는지 실제 소스코드를 보고 파악해보자.

#### Server.js

```js
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
let server = http.createServer(app);
let io = new Server(server);

io.on('connection', (socket) => {
  //접속한 클라이언트 소켓ID 단, 새탭으로 들어오면 바뀐다.
  console.log('접속한 클라이언트의 socketid' + socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000);
```

#### Client

```html
<head>
  <meta .... />

</head>

<body>
  <section>
    <div class="text-box"></div>
    <form class=".chatform-box">
       <input id="input-text" type="text" autocomplete="off" />
       <button>Send</button>
    </form>
  </section>
  <script src="/socket.io/socket.io.js"></script>
  <script src=/static/js/source.js></script>
</body>
```

- source.js

```js
const chat_form = document.querySelector('.chatform-box');
const input = document.querySelector('.input-text');
const text_box = document.querySelector('.text-box');
// import { io } from 'socket.io-client';

/* 클라이언트 연결 */
let socket = io();  //socket.io 서버에 연결

input.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!input.value) {
    socket.emit('error ');
  }
  console.log(e);
  /* message 이벤트 발생 */
  socket.emit('chat_message', input.value);

  input.value = '';
});

socket.on('chat_message', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    text_box.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

socket.on('disconnect', () => {
  console.log('클라이언트 닫기 성공')
}
```

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
