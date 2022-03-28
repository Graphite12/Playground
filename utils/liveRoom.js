const listRoom = [];
const active_users = [];

const liveRoom = {
  /* 방 중복 여부 검사 */
  existRoom: (subject) => {
    // let isExist = false;

    roomLists.findIndex((exist) => {});

    return roomList;
  },

  existRoomUsers: (user) => {
    users.filter((uname) => {
      if (uname.id === user.id) {
        return;
      }
    });
  },
  activeUserCnt: () => {
    users.length;
  },

  addUser: (user) => {
    for (let i = 0; i < active_users.length; i++) {
      if (active_users[i].id === user.id) {
        return;
      }
    }
    active_users.push(user);
    console.log(active_users);
  },

  exitUser: (user) => {},
  kickUser: (user) => {},
  banUser: (user) => {},

  createRoom: (subject, roomid, owner) => {
    let room = { subject, roomid, owner };
    listRoom.push(room);
    return room;
  },

  deleteRoom: () => {},
};

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

export { liveRoom, LiveRoom, listRoom, active_users };
