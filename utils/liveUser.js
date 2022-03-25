const lusers = [];

// 일반 변수
const LiveUsers = {
  createUsers: (id, username) => {
    const user = { id, username };

    lusers.push(user);

    return user;
  },
  getCurrentUser: (id) => {
    return lusers.find((uid) => uid.id === id);
  },

  //사용자 퇴장
  //   leaveUser: (id) => {
  //     const idx = lusers.findIndex((uid) => uid.id === id);

  //     if (idx !== -1) {
  //       //접속된 사용자 index를 하나만 제거한다.
  //       return lusers.splice(idx, 1)[0];
  //     }
  //   },

  //   //사용자가 입장한 방 확인
  //   getUserInRoom: (room) => {
  //     return lusers.filter((uid) => uid.room === room);
  //   },
};

// 클래스형
class LiveUser {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }
  getCurrentUserName() {
    return this.username;
  }
  //참여한 사용자 조회
  getCurrentUserId() {
    return this.id;
  }
}

class LiveUserList {
  constructor(users = []) {
    this.list = users;
  }

  addUser(user) {
    this.list.push(user);
  }

  getUserById(id) {
    this.list.find((uid) => uid.id === id);
  }

  getUsersByUserName(id, username) {
    let curr_user = this.getUserById(id);

    if (curr_user) {
      this.list.filter((name) => {
        if (name.username !== username) {
          return {
            acc_status: true,
            message: '통과',
          };
        }
      });
    }

    return {
      acc_status: false,
      message: '사용자가 존재하지 않거나 중복된 닉네임입니다.',
    };
  }
}

export { LiveUser, LiveUserList, LiveUsers };
