/* 소켓io연결 */
let socket = io();

/* Dom Control */
//사용자 추가
const addUserForm = document.querySelector('#add_user');
const addUserInput = document.querySelector('.input_username');
//메인페이지 사용자 리스트
const mainUserList = document.querySelector('.user_list_guide');

/* 버튼 이벤트 */
addUserForm.addEventListener('submit', addUser);

/* 소켓 이벤트 */
socket.on('update_client_user_list', (user) => {
  console.log(user);
  let userlist = document.createElement('li');
  userlist.textContent = '';
  mainUserList.append(userlist);
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
