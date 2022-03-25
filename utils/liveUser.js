const users = [];

const liveUser = {
  //사용자 참여
  createUser: (id, username, room) => {
    //사용자가 같은 방 같은 닉네임 존재 중복여부
    const existUser = users.find(
      (uid) => uid.room === room && uid.username === username,
    );

    if (existUser) {
      return { error: '중복된 사용자 이름입니다.' };
    }

    const user = { id, username, room };

    users.push(user);

    return user;
  },

  //참여한 사용자 조회
  getCurrentUser: (id) => {
    return users.find((uid) => uid.id === id);
  },

  //사용자 퇴장
  leaveUser: (id) => {
    const idx = users.findIndex((uid) => uid.id === id);

    if (idx !== -1) {
      //접속된 사용자 index를 하나만 제거한다.
      return users.splice(idx, 1)[0];
    }
  },

  //사용자가 입장한 방 확인
  getUserInRoom: (room) => {
    return users.filter((uid) => uid.room === room);
  },
};

export default liveUser;
