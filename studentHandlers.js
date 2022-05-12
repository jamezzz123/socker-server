module.exports = (io, socket) => {
    // console.log(socket.handshake)
    io.on("join:class", (payload) => {
        console.log("joinClass", payload);
        console.log(socket.join(payload.lesson));
        console.log(io.sockets.adapter.rooms);
    })

}