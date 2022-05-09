module.exports = (io, socket) => {
    const createLiveClass = (payload) => {
        // ...
        let classID = Math.floor(Math.random() * 1000000);
        // socket.broadcast.emit("classCreated", {
        //     classID: classID,
        //     className: 'payload.className',
        //     schoolID: 2322
        // })

        console.log({
            classID: classID,
            className: payload.name,
            schoolID: 2322,
            age: payload.age
        })

    }

    // socket.join()

    console.log(socket.id)

    // socket.broadcast.emit('enterFullScreen', true);

    socket.on('joinClass', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });


    socket.on("gotoPage", (payload) => {
        console.log("payload", payload);
        socket.broadcast.emit('changePage', payload);
    })
}