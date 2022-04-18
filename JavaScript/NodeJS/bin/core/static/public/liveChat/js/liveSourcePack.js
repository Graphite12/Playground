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

/* 버튼 이벤트 */
addUserForm.addEventListener('submit', addUser);
addRoomForm.addEventListener('submit', addRoom);

/* 소켓 이벤트 */

socket.on('update_user_list', ({ user, uid }) => {
  let uli = document.createElement('li');
  let span = document.createElement('span');

  currentUser = localStorage.setItem('user_token', uid);

  user.forEach((us, idx) => {
    span.textContent = us.spec.username;
    uli.append(span);
    mainUserList.append(uli);
  });
});

socket.on('update_room_list', (room) => {
  let rli = document.createElement('li');
  let span = document.createElement('div');
  let maker = document.createElement('div');
  let btn = document.createElement('button');
  let form = document.createElement('form');

  // mainRoomList.textContent = '';

  room.forEach((rm, idx) => {
    mainRoomList.append(rli);
  });
});

socket.emit('join_room');

socket.on('owner_join_chat', (data) => {});
/* 이벤트 헨들러 */

socket.on('update_joined_user_list', (data) => {});
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
  currentUser = localStorage.getItem('user_token');

  socket.emit('create_room', { roomname, currentUser });

  roomname = '';
}
