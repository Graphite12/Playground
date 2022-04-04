import generateUUID from '../uuid.js';

// 클래스형
export default class LiveUser {
  constructor() {
    this.storedUuid;
    this.users = [];
  }
  isExists(uname) {
    return this.users.forEach((user) => {
      if (user.spec.useranme === uname) {
        return true;
      }
      return false;
    });
  }
  getCurrentUserName() {
    return this.username;
  }
  //참여한 사용자 조회
  getCurrentUserId(uuid) {
    return this.users.filter((uid) => {
      return uid.id === uuid;
    });
  }
  addUser(uname) {
    let uuid = generateUUID();
    let user = { id: uuid, spec: { username: uname } };

    this.users.push(user);

    return { id: uuid, useranme: uname };
  }
  removeUser(uid) {
    let user = this.getCurrentUserId(uid);

    if (user) {
      this.users;
    }

    return user;
  }
}
