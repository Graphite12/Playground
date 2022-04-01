import liveChatData from './liveChatData.js';

const getClientUser = (uid) => {
  let userdata = liveChatData.users;

  // for (let i = 0; i < userdata.length; i++) {
  //   if (userdata[i].userId !== id) {
  //     return {
  //       errorMsg: {
  //         success: false,
  //         message: '가입좀하셈',
  //       },
  //     };
  //   } else {
  //     return {
  //       user: {
  //         id: userdata[i].userId,
  //         username: userdata[i].userName,
  //       },
  //     };
  //   }
  // }
  console.log(userdata);

  for (let i in userdata) {
    if (userdata[i].userId === uid) {
      return {
        userId: userdata[i].userId,
        username: userdata[i].userName,
      };
    }
  }
};

const userIsExist = (uid, uname) => {
  let alreadyUser = false;
  let userlist = liveChatData.users;

  if (Array.isArray(userlist) && userlist.length === 0) {
    return alreadyUser;
  }

  // for (let i = 0; i < userlist.length; i++) {
  //   console.log('고전 포문');
  //   console.log(userlist);
  //   console.log(userlist[i]);
  // }

  // for (let i of userlist) {
  //   console.log('포오프');
  //   console.log(i);
  //   console.log(userlist[i]);
  // }
  if (uid && uname) {
    for (let i in userlist) {
      // console.log('포인');
      // console.log(i);
      // console.log(userlist[i].userName);

      if (userlist[i].userName === uname) {
        alreadyUser = true;
        return alreadyUser;
      }

      if (userlist[i].userId === uid) {
        alreadyUser = true;
        return alreadyUser;
      }

      return alreadyUser;
    }
  }

  // userlist.forEach((e, i) => {
  //   console.log('포이치');
  //   console.log(e);
  //   console.log(i);
  //   console.log(e[i]);
  // });
};

const createUsers = (id, username) => {
  // let isExists = existClientIdAndUssername(id, username);
  // console.log('중복여부체크:' + isExists);

  // if (id || username) {
  //   for (let i = 0; i < liveChatData.users.length; i++) {
  //     if (id === liveChatData.users[i].userId) {
  //       return {
  //         errorMsg: {
  //           success: false,
  //           message: '중복가입(ID)',
  //         },
  //       };
  //     }
  //     if (username === liveChatData.users[i].userName) {
  //       return {
  //         errorMsg: {
  //           success: false,
  //           message: '중복가입(사용자명)',
  //         },
  //       };
  //     }
  //   }
  // }

  let user = {
    userId: id,
    userName: username,
  };

  if (!userIsExist(id, username)) {
    liveChatData.users.push(user);

    // console.log('서버에 추가된 사용자 리스트 :' + JSON.stringify(liveChatData));

    return {
      userdata: {
        user: user,
      },
    };
  } else {
    return {
      errorMsg: {
        success: false,
        message: '중복가입(사용자명 및 ID)',
      },
    };
  }
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
