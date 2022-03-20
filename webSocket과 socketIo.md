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

```js
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
let server = http.createServer(app);
let io = new Server(server);

server.listen(3000);
```

### SocketIO 옵션
