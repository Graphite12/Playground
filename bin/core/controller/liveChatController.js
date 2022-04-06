/* 소켓 컨트롤러 분류 */

import LiveRoom from '../../../utils/[Class]livechatData/liveRoom.js';
import LiveUser from '../../../utils/[Class]livechatData/liveUser.js';
let users = new LiveUser();
let rooms = new LiveRoom();

function liveChatConroller(ws, socket) {
  /* 메인채팅 입장 시  */
  /* 메인 채팅 앱 가입 시 */
  socket.on('join_user', (data) => {
    if (data.username) {
      if (users.isExists(data.username)) {
        console.log('중복닉네임');
      } else {
        let user = users.addUser(data.username);
        console.log(users.users);
        ws.emit('update_client_user_list', { user });
      }
    }
  });

  /* 채팅 방 생성 */
  socket.on('create_room', (room) => {
    let roomid = rooms.rooms.length;
    let roomname = room.roomname;
    let userid = room.currentUser;

    let owner = users.isCurrentUser(userid);
    console.log('오우너', owner);
    if (roomname) {
      let roomdata = rooms.addRoom(roomid, roomname, owner);
      console.log(roomdata.info.rname);
      console.log(roomdata);
      socket.room = roomname;
      socket.join(socket.room);

      ws.emit('update_client_room_list', { data: roomdata.info.rname });
    }
  });
  /* 채팅 방 참여 */

  socket.on('join_room', (room, cb) => {
    socket.room = room;

    socket.leave(socket.room);
    socket.join(socket.room);
  });

  socket.on('send_message', (data) => {});
}

export default liveChatConroller;
