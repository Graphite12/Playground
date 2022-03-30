import liveChatData from './liveChatData.js';
const createRoom = (id, rname, owner) => {
  for (let i = 0; liveChatData.roomList.length; i++) {
    if (id) {
    }

    if (rname) {
    }
  }

  let room = { id, rname, owner };
  liveChatData.roomList.push(room);

  return liveChatData.roomList;
};
const isExistRoom = () => {};

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

export { createRoom };
