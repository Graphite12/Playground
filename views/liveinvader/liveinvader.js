const chat_form = document.querySelector('.chatform-box');
const text_box = document.querySelector('.text-box');

const liveinvader = () => {
  let socket = io('http://localhost:8080');

  chat_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.msg.value;
    socket.emit('message', msg);
    e.target.msg.value = '';
  });

  const uploadMsg = (msg) => {};

  socket.on('message', (msg) => {
    text_box.appendChild(uploadMsg());
  });
};

const login = (username, password) => {
  let socket = io();

  socket.emit('enteruser', { username, password });
};
