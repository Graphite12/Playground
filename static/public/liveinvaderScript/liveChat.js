const chat_form = document.querySelector('.chatform-box');
const inputField = document.querySelector('.input-text');
const message_box = document.querySelector('.text-box');
const listen_chat = document.querySelector('.listen-chat');
const room_list = document.querySelector('.room-list');
const user_list = document.querySelector('.user-list');
const users_list = document.querySelector('.users-list');
const create_room_form = document.querySelector('.create_room');
const create_room_btn = document.querySelector('.create_chat_room');
// const userInput = document.querySelector('.username-input');
const room_subject_input = document.querySelector('.chat_room_subject_input');
// import { io } from 'socket.io-client';

/* 클라이언트 연결 */
let socket = io(); //socket.io 서버에 연결
let current_room;
let current_userName;
/* 사용자 채팅방 생성 */
create_room_btn.addEventListener('click', () => {
  const sbj = room_subject_input.value;
  let roomLi = document.createElement('li');

  socket.emit('create_room', { subject: sbj }, (data) => {
    current_room = data.room_id;
    roomLi.textContent(current_room);
  });
});

/* 사용자 추가 */

/* 사용자 접속 */
function joinRoom(room) {
  socket.emit('join_room', { room_id: room.id }, (data) => {});
}
/* 사용자 메세지 입력 */
socket.emit('chatting', (msg) => {});

/* 사용자 비밀 메세지 입력 */

/* 사용자 연결 종료 */
socket.emit('');
