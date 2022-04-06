import generateUUID from '../uuid.js';
let user = new Map();
// 클래스형
export default class LiveUser {
  constructor() {
    this.storedUuid;
    this.users = [];
  }
  isExists(uname) {
    return this.users.find((user) => user.spec.username === uname);
  }
  isCurrentUser(uid) {
    return this.users.find((user) => user.id === uid);
  }
  getCurrentUserName() {
    return this.username;
  }
  //참여한 사용자 조회
  getCurrentUserId(uuid) {
    return this.users.find((uid) => {
      return uid.id === uuid;
    });
  }
  getUserList() {
    return this.users.map((list, idx) => {
      return list;
    });
  }
  addUser(uname) {
    let uuid = generateUUID();
    let user = { id: uuid, spec: { username: uname } };

    this.users.push(user);

    return { id: uuid, uname: uname };
  }
  removeUser(uid) {
    let user = this.getCurrentUserId(uid);

    if (user) {
      this.users;
    }

    return user;
  }
}
