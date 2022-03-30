import liveChatData from './liveChatData.js';

// 일반 변수
const getClientUser = (id) => {
  let userdata = liveChatData.users;

  for (let i = 0; i < userdata.length; i++) {
    if (userdata[i].userId !== id) {
      return {
        errorMsg: {
          success: false,
          message: '가입좀하셈',
        },
      };
    } else {
      return id;
    }
  }
};
const createUsers = (id, username) => {
  // let isExists = existClientIdAndUssername(id, username);
  // console.log('중복여부체크:' + isExists);

  if (id || username) {
    for (let i = 0; i < liveChatData.users.length; i++) {
      if (id === liveChatData.users[i].userId) {
        return {
          errorMsg: {
            success: false,
            message: '중복가입(ID)',
          },
        };
      }
      if (username === liveChatData.users[i].userName) {
        return {
          errorMsg: {
            success: false,
            message: '중복가입(사용자명)',
          },
        };
      }
    }
  }

  let user = {
    userId: id,
    userName: username,
  };

  liveChatData.users.push(user);

  console.log('서버에 추가된 사용자 리스트 :' + JSON.stringify(liveChatData));

  return {
    userdata: {
      success: true,
      user: user,
    },
  };
};
// const getCurrentUser = (id) => {
//   return listUser.find((uid) => uid.id === id);
// };

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

export { createUsers, getClientUser };
