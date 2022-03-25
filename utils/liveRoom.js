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
    active_users.push(user);
  },

  exitUser: (user) => {},
  kickUser: (user) => {},
  banUser: (user) => {},

  createRoom: (subject, id, owner) => {
    let room = { subject, id, owner };
    roomLists.push(room);
    return room;
  },

  deleteRoom: () => {},
};

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

export { liveRoom, LiveRoom, listRoom };
