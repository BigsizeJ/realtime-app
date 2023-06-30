let onlineUser = [];

module.exports = (io) => {
  io.on("connection", (client) => {
    client.on("connected", (data) => {
      const existed = onlineUser.find((user) => user.socketID === client.id);
      if (existed) return;
      onlineUser.push({ ...data, socketID: client.id });
      io.emit("online", [...onlineUser]);
      console.log(`${data.username} is connected`);
    });

    client.on("alertUser", (data) => {
      client
        .to(data.receiver)
        .emit("receivedMessage", { message: data.message, read: false });
    });

    client.on("disconnect", () => {
      const disconnectingUser = onlineUser.find(
        (user) => user.socketID === client.id
      );
      onlineUser = onlineUser.filter((user) => user.socketID !== client.id);
      io.emit("online", [...onlineUser]);
      if (disconnectingUser)
        console.log(`${disconnectingUser.username} is disconnecting`);
    });
  });
};
