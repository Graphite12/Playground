/* 소켓 컨트롤러 분류 */

import LiveUser from '../../../utils/[Class]livechatData/liveUser.js';
let users = new LiveUser();

function liveChatConroller(ws, socket) {
  //   console.log('웹소켓', socket);
  socket.on('join_user', (data) => {
    if (data.username) {
      console.log(users.isExists(data.useranme));
      if (users.isExists(data.useranme)) {
        const uid = users.addUser(data.username);

        console.log(users.users);
        console.log(uid);
        console.log('사용자확인', users.isExists(uid.useranme));

        socket.emit('update_client_user_list', { user: users.users });
      }
    }
  });
}

export default liveChatConroller;
