import { text } from 'express';

const liveinvader = () => {
  let socket = io('http://localhost:8080');

  const chatform = document.querySelector('.chatform-box');
  const msgbox = document.querySelector('.text-box');

  chatform.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.msg.value;
    socket.emit('message', msg);
    e.target.msg.value = '';
  });

  const uploadMsg = (msg) => {};

  socket.on('message', (msg) => {
    msgbox.appendChild(uploadMsg());
  });
};
