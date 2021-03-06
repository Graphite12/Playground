export default class LiveRoom {
  constructor() {
    this.rooms = [];
    this.roomMembers = [];
    this.currentRoom = null;
    this.currentUser = null;
  }
  joinUserRoom(data) {
    this.roomMembers.push(data);
  }

  activeRoom() {
    return this.rooms;
  }

  addRoom(id, rname, owner) {
    let room = {
      id: id,
      info: {
        rname: rname,
        owner: owner,
      },
    };

    this.rooms.push(room);

    return room;
  }
}
