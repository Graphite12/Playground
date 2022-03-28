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
let current_room;
let current_username;

/*
=====================

    채팅룸 소켓 통신

=====================
*/
/* 사용자 채팅방 생성 */
socket.on('update_chat_room', (data) => {
  console.log('채팅방 추가기능(Client)');
  console.log(data);
  console.log('채팅방 추가기능(Client)');

  updateChatRoomList(data);
});

/* 사용자 추가 */

socket.on('update_chat_user', (data) => {
  console.log('사용자 추가기능(Client)');
  console.log(data);
  console.log('사용자 추가기능(Client)');

  updateChatAppUserList(data);
});

/* 사용자 접속 */

/* 사용자 메세지 입력 */
socket.emit('chatting', (msg) => {});

/* 사용자 비밀 메세지 입력 */

/* 사용자 연결 종료 */
socket.emit('');

/*
=====================

    채팅룸 버튼 이벤트

=====================
*/
create_room_btn.addEventListener('click', createChatRoom);
register_user_form.addEventListener('submit', registerUser);

/*
=====================

    채팅룸 이벤트 기능

=====================
*/

//채팅 생성
function createChatRoom() {
  const sbj = room_subject_input.value;
  socket.emit('create_room', { subject: sbj });
}

function updateChatRoomList(data) {
  let userlist = data.roomUserList;
  let chatroom = data.room;

  const roomLi = document.createElement('li');
  const roomLink = document.createElement('a');
  const roomUserCnt = document.createElement('span');

  for (let i = 0; i < chatroom.length; i++) {
    let owner = data.room[i].owner;
    let room = chatroom[i];
    console.log(room);
    let cntUser = parseInt(userlist.length);

    roomLink.setAttribute('href', '#');
    roomLink.textContent = room.subject;

    roomUserCnt.textContent = userlist.length;

    roomLi.append(roomLink, roomUserCnt);
    room_list.appendChild(roomLi);
  }
}

//채팅 참여
function joinRoom(room) {
  socket.emit('join_room', { room_id: room.id }, (data) => {
    console.log(data);
  });
}

/* 채팅앱 리스트 렌더링 */
function updateChatAppUserList(data) {
  const userli = document.createElement('li');
  userli.textContent = data[socket.id].username;

  all_user_list.appendChild(userli);
}

/* 사용자 가입 */
function registerUser(e) {
  e.preventDefault();

  current_username = register_username_input.value;
  console.log(current_username);

  socket.emit('create_user', { username: current_username });
}
