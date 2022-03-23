const chat_form = document.querySelector('.chatform-box');
const input = document.querySelector('.input-text');
const text_box = document.querySelector('.text-box');
// import { io } from 'socket.io-client';
/* 클라이언트 연결 */
let socket = io();

socket.on('connect', () => {
  console.log('연결 축하드림');
});

// chat_form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   if (!input.value) {
//     socket.emit('error ');
//   }
//   console.log(e);
//   /* message 이벤트 발생 */
//   socket.emit('message', input.value);

//   input.value = '';
// });

// const uploadMsg = (msg) => {};

// socket.on('message', (msg) => {
//   text_box.appendChild(uploadMsg());
// });

// const login = (username, password) => {
//   let socket = io();

//   socket.emit('enteruser', { username, password });
// };
