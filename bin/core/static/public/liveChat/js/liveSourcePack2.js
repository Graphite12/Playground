/* 소켓io연결 */
let socket = io();
const chatlist = document.querySelector('.chat_list_guide');
const chatform = document.querySelector('.send_message');
const chatinput = document.querySelector('.input_chatmsg');

chatform.addEventListener('submit', sendMessage);

socket.on('update_new_message', () => {});
socket.on('join_room');

function sendMessage(e) {
  e.preventDefault();

  let chatmsg = chatinput.value;
  if (chatmsg === '') {
    alert('채팅 메세지 입력좀');
    return;
  }

  socket.emit('send_message', { chatmsg });

  chatmsg = '';
}

function messageForm(id, text, time) {}
