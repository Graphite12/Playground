const chat_form = document.querySelector('.chatform-box');
const inputField = document.querySelector('.input-text');
const message_box = document.querySelector('.text-box');
const listen_chat = document.querySelector('.listen-chat');
const room_list = document.querySelector('#room-list');

// import { io } from 'socket.io-client';

/* 클라이언트 연결 */
let socket = io(); //socket.io 서버에 연결

socket.on('connect', () => {
  console.log('클라이언트 연결 성공');
});

socket.on('joinRoom', { username, room });

// 서버로부터 메세지 수신 받고 html그려넣기
socket.on('message', (data) => {
  let new_message = document.createElement('li');
  const { username, text, time } = data;

  let textbox = `
  <div>
    <div>${username}, ${time}</div>
    <div>${text}</div>
  </div>
  `;

  console.log(textbox);

  new_message.textContent = textbox;
  message_box.appendChild(new_message);
});

// 입력 버튼이 눌리면, 서버로 메세지 전송
chat_form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!inputField.value) {
    console.log('메세지를 입력하세요.');
    return;
  }
  console.log(e);
  /* message라는 이벤트에 담긴 내용을 서버로 전달 */
  socket.emit('chatMessage', inputField.value);

  inputField.value = '';
});

inputField.addEventListener('keyup', () => {
  socket.emit('typing', {
    isTyping: inputField.value.length > 0,
  });
});

socket.on('typing', (isTyping) => {
  const { isTyping } = isTyping;
  if (!isTyping) {
    listen_chat.textContent = '';
    return;
  }

  listen_chat.textContent = `<p>님이 입력중입니다.</p>`;
});

const createRoom = (data) => {
  const roomName = document.createElement('li');

  roomName.textContent = data;
};

const deleteRoom = (data) => {};
// socket.on('message', (data) => {});

socket.on('disconnect', () => {
  console.log('클라이언트 닫기 성공');
});
