// /* 소켓 컨트롤러 분류 */

// import { rooms, users } from '../../utils/[Class]livechatUtil/newInstance.js';

// const liveChatController = (ws, socket) => {
//   /* 메인 채팅 앱 입장 시  */

//   /* 채팅 방 생성 */
//   socket.on('create_room', (room) => {
//     let roomid = rooms.rooms.length;
//     let roomname = room.roomname;
//     console.log(room);

//     let owner = users.getCurrentUserId(room.currentUser);

//     console.log(users.users);
//     console.log('오우너', owner);

//     if (roomname && owner) {
//       let roomdata = rooms.addRoom(roomid, roomname, owner.spec.username);
//       // console.log(roomdata.info.rname);
//       console.log(roomdata);

//       socket.leave(socket.room);
//       socket.room = roomname;
//       socket.join(socket.room);
//       console.log(rooms.rooms);
//       ws.emit('update_room_list', rooms.rooms);
//       socket
//         .to(socket.room)
//         .emit('join_chat_msg', `${owner} 님이 채팅방에 입장하셨습니다.`);
//     }
//   });
//   /* 채팅 방 참여 */

//   socket.on('join_room', (room, cb) => {
//     console.log('참여방', room);
//     rooms.joinUserRoom();
//     socket.leave(socket.room);
//     socket.room = room;
//     socket.join(socket.room);

//     socket.on('update_joined_user_list', { data: rooms.joinUser });
//   });

//   // socket.broadcast.emit('user_connected', (data) => {
//   //   let user = users.getUserData(socket.id);
//   //   console.log(user);
//   // });

//   socket.on('send_message', (data) => {});

//   socket.on('private_message', (data) => {});
//   socket.on('isTyping', (data) => {});
// };

// export default liveChatController;

export default {
  getMain: (req, res, next) => {},
  getRoom: (req, res, next) => {},
};
