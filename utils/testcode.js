socket.on('create_user', function (data, callback) {
  var username = data['username'];
  if (username) {
    socket.username = username;

    var userAlreadyExists = false;
    var oldUserId;
    for (var id in users) {
      if (users.hasOwnProperty(id)) {
        if (users[id].username === username) {
          userAlreadyExists = true;
          oldUserId = id;
          break;
        }
      }
    }

    if (userAlreadyExists) {
      // if username already exists, then reset the id to the socket id
      var oldUser = users[oldUserId];

      var user = oldUser;
      user.id = socket.id;
      users[user.id] = user;
      delete users.oldUserId;
      // update owner IDs and users
      for (var i = 0; i < chatRooms.length; i++) {
        var room = chatRooms[i];
        // update owner
        if (room.owner.username === username) {
          room.owner.id = user.id;
        }
        // update users
        for (var i = 0; i < room.users.length; i++) {
          var roomUser = room.users[i];
          if (roomUser.username === username) {
            roomUser.id = user.id;
          }
        }
        // update banned users
        for (var i = 0; i < room.bannedUsers.length; i++) {
          var roomUser = room.bannedUsers[i];
          if (roomUser.username === username) {
            roomUser.id = user.id;
          }
        }
      }
      console.log(username + ' rejoined the server with id ' + socket.id);
    } else {
      // if creating new new user
      var user = new User(socket.id, socket.username);
      users[user.id] = user;
      console.log(username + ' joined the server with id ' + socket.id);
    }

    callback({ success: true });

    // send update to all users
    io.sockets.emit('update_users', users);

    // send chat room list to the newly registered client
    socket.emit('update_chat_rooms', { rooms: chatRooms });
  } else {
    // handle error: username is empty
    callback({ success: false, message: 'username cannot be empty' });
  }
});
