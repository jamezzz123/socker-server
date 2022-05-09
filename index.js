const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
// import "reflect-metadata"
// import "database"

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */
    cors: {
        origin: "*",
    }
});

const registerLiveClassHandlers = require("./classHandlers");

const onConnection = (socket) => {
    registerLiveClassHandlers(io, socket);
}

io.on("connection", onConnection);

httpServer.listen(3030, () => {
    console.log("listening on *:3030");
})