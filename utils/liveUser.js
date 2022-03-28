const listUser = [];
const current_user = {};

function existClientIdAndUssername(id, username) {
  let isExists = false;
  let oldUser;
  let oldUserName;

  listUser.findIndex((uid) => {
    if (uid === undefined) {
      listUser.push(id, username);
    }

    if (uid.id === id) {
      isExists = true;
      oldUser = id;
    }

    if (uid.username === username) {
      isExists = true;
      oldUserName = username;
    }

    if (isExists) {
      return {
        status: {
          oldUser,
          oldUserName,
          success: false,
          message: '이미 가입된 계정이거나, 닉네임이 중복되었습니다.',
        },
      };
    } else {
      return {
        status: {
          success: true,
        },
      };
    }
  });
}

// 일반 변수
const LiveUsers = {
  createUsers: (id, username) => {
    // let isExists = existClientIdAndUssername(id, username);
    // console.log('중복여부체크:' + isExists);

    const user = { id, username };
    listUser.push(user);

    console.log('서버에 추가된 사용자 리스트 :' + JSON.stringify(listUser));
    return user;
  },
  getCurrentUser: (id) => {
    return listUser.find((uid) => uid.id === id);
  },
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

export { LiveUser, LiveUserList, LiveUsers, listUser, current_user };
