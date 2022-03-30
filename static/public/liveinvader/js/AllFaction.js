/* 사용자 추가 */
//클라이언트에서 인풋에 입력후 버튼 누름
//서버로 날라감
//서버는 사용자를 db혹은 배열에 추가
//전체 사용자에게 이벤트 날림(추가되었다는것을 시각적으로 알림)
const socket = io();

const register_user_form = document.querySelector('.register-form');
const register_username_input = document.querySelector('.username-input');

register_user_form.addEventListener('submit', (e) => {
  e.preventDefault();

  const current_username = register_username_input.value;

  if (current_username) {
    socket.emit('create_user', { username: current_username });
    register_username_input.value = '';
  }
});

/* 방 생성 */
const create_room_btn = document.querySelector('.create_chat_room');
const create_room_form = document.querySelector('.create_room');
const active_room_list = document.querySelector('.active_room_list');

create_room_btn.addEventListener('click', () => {
  const create_chatroom_input = document.querySelector(
    '.chat_roomname_input',
  ).value;

  socket.emit('create_room', { roomname: create_chatroom_input });
});

socket.on('update_main_chatroom', (data) => {
  console.log(data);
  console.log(JSON.stringify(data.roomlist[0].id));

  const roomlist = document.createElement('li');
  const roomLink = document.createElement('a');
  const roomspan = document.createElement('span');
  const roomname = data.roomlist[0].rname;
  const roomid = data.roomlist[0].id;

  roomspan.textContent = roomname;
  roomLink.setAttribute('href', `/liveinvader/chat/${roomid}`);
  roomLink.textContent = '참여하기';

  roomlist.append(roomLink);
  active_room_list.append(roomspan, roomlist);
});

/* 방 참가 */

/* 사용자 리스트 추가 */
const joined_mainpage_user_list = document.querySelector(
  '.joined-mainpage-user-list',
);

socket.on('update_main_userlist', (data) => {
  console.log(data);

  const username = data.userdata.userName;

  if (username) {
    let userlist = document.createElement('li');
    userlist.textContent = username;
    joined_mainpage_user_list.append(userlist);
  }
});

/* 메세지 수신 */

/* 사용자 연결 종료 */

/* 모달 */
