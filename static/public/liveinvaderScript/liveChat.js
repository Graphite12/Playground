const chat_form = document.querySelector('.chatform-box');
const inputField = document.querySelector('.input-text');
const message_box = document.querySelector('.text-box');
const listen_chat = document.querySelector('.listen-chat');
const room_list = document.querySelector('.room-list');
const user_list = document.querySelector('.user-list');
const all_user_list = document.querySelector('.all-user-list');
const create_room_form = document.querySelector('.create_room');
const create_room_btn = document.querySelector('.create_chat_room');
const register_user_form = document.querySelector('.register-form');
const register_username_input = document.querySelector('.username-input');
const room_subject_input = document.querySelector('.chat_room_subject_input');

/* 클라이언트 연결 */
let socket = io(); //socket.io 서버에 연결
let active_room;
let active_username;

/* 사용자 채팅방 생성 */
create_room_btn.addEventListener('click', () => {
  const sbj = room_subject_input.value;
  let roomLi = document.createElement('li');

  socket.emit('create_room', { subject: sbj }, (data) => {
    active_room = data.room_id;
    roomLi.textContent(active_room);
  });
});

/* 사용자 추가 */
function registerUser(e) {
  e.preventDefault();

  active_username = register_username_input.value;
  console.log(active_username);

  socket.emit('create_user', { username: active_username });
}

register_user_form.addEventListener('submit', registerUser);
/* 사용자 HTML렌더링 */
socket.on('update_chat_user', (data) => {
  console.log('서버한테 넘어온 데이터' + JSON.stringify(data));

  const userli = document.createElement('li');
  userli.textContent = data.uid.username;

  all_user_list.appendChild(userli);
});

/* 사용자 접속 */
function joinRoom(room) {
  socket.emit('join_room', { room_id: room.id }, (data) => {
    console.log(data);
  });
}
/* 사용자 메세지 입력 */
socket.emit('chatting', (msg) => {});

/* 사용자 비밀 메세지 입력 */

/* 사용자 연결 종료 */
socket.emit('');
