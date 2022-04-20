import { rooms, users } from './[Class]livechatUtil/newInstance.js';

const socket = (ws) => {
  ws.on('connection', (socket) => {
    /* 메인 채팅 앱 가입 시 */

    socket.on('join_user', (data) => {
      if (data.username) {
        if (users.isExists(data.username)) {
          console.log('중복 닉네임');
        } else {
          let user = users.addUser(socket.id, data.username);
          console.log('사용자 정보', user);

          socket.auth = user.id;
          console.log('사용자 ID', socket.auth);

          ws.emit('update_user_list', { user: users.users, uid: socket.auth });
        }
      }
    });

    socket.on('join_room', (room) => {});
  });
};

export default socket;
