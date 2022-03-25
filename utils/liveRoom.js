const roomList = [];

const roomOption = {
  /* 방 중복 여부 검사 */
  existRoom: (subject) => {
    // let isExist = false;

    roomList.some((exist) => {
      return roomList.indexOf(exist) !== roomList.lastIndexOf(exist);
    });

    return roomList;
  },

  createRoom: (data) => {
    roomList.push(data);
  },

  deleteRoom: () => {},
};
