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
const registerTeacherHandlers = require("./teacherHandlers");
const registerStudentHandlers = require("./studentHandlers");

const onConnectionTeacher = (socket) => {
    registerTeacherHandlers(io, socket, studentSocket);
}
const onConnectionStudent = (socket) => {
    registerStudentHandlers(io, socket);
}

const teacher = io.of("/teacher", registerTeacherHandlers);
const studentSocket = io.of("/student", registerStudentHandlers);

teacher.on("connection", onConnectionTeacher);
studentSocket.on("connection", onConnectionStudent);

httpServer.listen(3030, () => {
    console.log("listening on *:3030");
})