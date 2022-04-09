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
  getUserData(sid) {
    return this.users.find((uid) => {
      return uid.id === sid;
    });
  }
  //참여한 사용자 조회
  getCurrentUserId(uuid) {
    return this.users.find((uid) => {
      console.log('사람', uuid);
      console.log('저장', uid.id);
      return uid.id === uuid;
    });
  }
  getUserList() {
    return this.users.map((list, idx) => {
      return list;
    });
  }
  addUser(id, uname) {
    // let uuid = generateUUID();
    let user = { id: id, spec: { uuid: generateUUID(), username: uname } };

    this.users.push(user);

    return { id: user.id, uname: user.spec.username };
  }
  removeUser(uid) {
    let user = this.getCurrentUserId(uid);

    if (user) {
      this.users;
    }

    return user;
  }
}
