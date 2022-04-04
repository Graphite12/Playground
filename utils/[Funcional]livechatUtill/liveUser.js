import generateUUID from '../uuid.js';

const getClientUser = (uid) => {
  let userdata = liveChatData.users;

  console.log(userdata);

  for (let i in userdata) {
    if (String(Object.keys(userdata[i])) === uid) {
      return {
        userId: userdata[i][uid].uid,
        username: userdata[i][uid].uname,
      };
    }
  }
};

const userIsExist = (uid) => {
  let userlist = liveChatData.users;

  if (Array.isArray(userlist) && userlist.length === 0) {
    return false;
  }

  if (uid) {
    for (let i in userlist) {
      let key = Object.keys(userlist[i]);
      if (String(Object.keys(userlist[i])) === uid) {
        return true;
      }
    }
    return false;
  }
};
const isExistUsername = (uname) => {};
const createUsers = (id, username) => {
  let user = {};
  let primary = generateUUID();

  user[id] = {
    uid: primary,
    uname: username,
  };

  console.log(userIsExist(id, username));

  if (userIsExist(id, username)) {
    return {
      errorMsg: {
        success: false,
        message: '중복가입(사용자명 및 ID)',
      },
    };
  } else {
    liveChatData.users.push(user);
    console.log('서버에 추가된 사용자 리스트 :' + JSON.stringify(liveChatData));

    return {
      userdata: user,
    };
  }
};
// const getCurrentUser = (id) => {
//   return listUser.find((uid) => uid.id === id);
// };

export { createUsers, getClientUser };
