/* 소켓 컨트롤러 분류 */

import { rooms, users } from '../../utils/[Class]livechatData/newInstance.js';

const liveChatConroller = (ws, socket) => {
  /* 메인 채팅 앱 입장 시  */

  /* 메인 채팅 앱 가입 시 */

  socket.on('join_user', (data) => {
    console.log(data);
    if (data.username) {
      if (users.isExists(data.username)) {
        console.log('중복 닉네임');
      } else {
        let user = users.addUser(socket.id, data.username);
        console.log('사용자', user);

        socket.auth = user.id;

        ws.emit('update_user_list', { user: users.users, uid: socket.auth });
      }
    }
  });

  /* 채팅 방 생성 */
  socket.on('create_room', (room) => {
    let roomid = rooms.rooms.length;
    let roomname = room.roomname;
    console.log(room);

    let owner = users.getCurrentUserId(room.currentUser);

    console.log(users.users);
    console.log('오우너', owner);

    if (roomname && owner) {
      let roomdata = rooms.addRoom(roomid, roomname, owner.spec.username);
      // console.log(roomdata.info.rname);
      console.log(roomdata);

      socket.leave(socket.room);
      socket.room = roomname;
      socket.join(socket.room);

      ws.emit('update_room_list', rooms.rooms);
      socket
        .to(socket.room)
        .emit('join_chat_msg', `${owner} 님이 채팅방에 입장하셨습니다.`);
    }
  });
  /* 채팅 방 참여 */

  socket.on('join_room', (room, cb) => {
    console.log('참여방', room);
    rooms.currentRoom = room;
    rooms.currentUser = users.getUserData(socket.id);
    rooms.joinUser.push();
    socket.leave(socket.room);
    socket.room = room;
    socket.join(socket.room);

    socket.on('update_joined_user_list', { data: rooms.joinUser });
  });

  // socket.broadcast.emit('user_connected', (data) => {
  //   let user = users.getUserData(socket.id);
  //   console.log(user);
  // });

  socket.on('send_message', (data) => {});

  socket.on('private_message', (data) => {});
  socket.on('isTyping', (data) => {});
};

export default liveChatConroller;
