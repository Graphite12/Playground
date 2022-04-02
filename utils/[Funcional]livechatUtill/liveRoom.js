import liveChatData from './liveChatData.js';
const createRoom = (id, rname, owner) => {
  let room = { id, rname, owner };
  liveChatData.roomList.push(room);

  return liveChatData.roomList;
};
const isExistRoom = () => {};

const isCurrentRoom = (owner) => {};

const roomJoinUser = (user, room) => {
  let userlist = liveChatData.joinUsers;
  let currentRoom = liveChatData.currentRoom;
  for (let i = 0; userlist.length; i++) {
    if (userlist[i].userId === user.userId) {
      return;
    }
  }

  let chatuser = { user };

  userlist.push(chatuser);
  currentRoom[room.id] = room;
  return chatuser;
};

const getCurrentUsers = (rname) => {
  let onlineUsers = liveChatData.joinUsers;
};
const updateUserList = (prev, next, id) => {};
const loginCheck = () => {};
const getUserByRoomId = () => {};

/* 클래스 */

class LiveRoom {
  constructor(subject, id, owner) {
    this.subject = subject;
    this.id = id;
    this.owner = owner;
    this.userList = [];
    this.banList = [];
    this.password = null;
    this.protected = false;
  }
  isAvailable() {}
  isProtected() {}
  addUsers() {}
  kickUsers() {}
  banUsers() {}
}

export { createRoom, roomJoinUser };
