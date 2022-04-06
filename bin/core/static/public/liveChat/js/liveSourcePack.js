/* 소켓io연결 */
let socket = io();

/* Dom Control */
const joinRoomBtn = document.querySelector('.join_room_btn');
//사용자 추가
const addUserForm = document.querySelector('#add_user');
const addUserInput = document.querySelector('.input_username');
//메인페이지 리스트
const mainUserList = document.querySelector('.user_list_guide');
const mainRoomList = document.querySelector('.room_list_guide');
//방 추가
const addRoomForm = document.querySelector('#add_room');
const addRoomInput = document.querySelector('.input_roomname');

let currentUser;
let currentRoom;
let room = ['room1'];
/* 버튼 이벤트 */
addUserForm.addEventListener('submit', addUser);
addRoomForm.addEventListener('submit', addRoom);

/* 소켓 이벤트 */
socket.emit('connected', () => {
  console.log('사용자 연결');

  currentUser = localStorage.getItem('clientUserData');
});

socket.on('update_client_user_list', (user) => {
  console.log(user);

  localStorage.setItem('clientUserData', user.user.id);

  let userlist = document.createElement('li');
  userlist.textContent = user.user.uname;
  mainUserList.append(userlist);
});

socket.on('update_client_room_list', (room) => {
  console.log(room);

  let roomlist = document.createElement('li');
  let joinbtn = document.createElement('a');
  joinbtn.textContent = 'Join Us';
  joinbtn.href = `/livechat/${room.data}`;
  joinbtn.classList('join_btn');

  roomlist.textContent = room;
  mainRoomList.append(roomlist.append(joinbtn));
});

/* 이벤트 헨들러 */

//사용자 추가
function addUser(e) {
  e.preventDefault();

  let username = addUserInput.value;
  if (username === '') {
    alert('사용자 명 입력안함');
    return;
  }

  socket.emit('join_user', { username });

  username = '';
}

function addRoom(e) {
  e.preventDefault();

  let roomname = addRoomInput.value;

  if (roomname === '') {
    alert('사용자 명 입력안함');
    return;
  }
  currentUser = localStorage.getItem('clientUserData');

  socket.emit('create_room', { roomname, currentUser });

  roomname = '';
}

function joinRoom(room) {
  const joinBtn = document.querySelector('.join_room');

  if (joinBtn) {
    socket.emit('join_room', room.data);
  }
}
