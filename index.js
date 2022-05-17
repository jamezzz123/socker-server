const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
// const { PrismaClient } = require('@prisma/client');
var cors = require('cors');
// const { InMemorySessionStore } = require("./sessionStorage");
// const sessionStore = new InMemorySessionStore();
const { setState, getState, router: ClassApi } = require('./liveClassApi.js')

// const { uuid } = require('uuidv4');






// import "reflect-metadata"
// import "database"

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/live-class', ClassApi);



const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */
    cors: {
        origin: "*",
    }
});
const registerTeacherHandlers = require("./teacherHandlers");
const registerStudentHandlers = require("./studentHandlers");

const onConnectionTeacher = (socket) => {
    registerTeacherHandlers(io, socket);
}
const onConnectionStudent = (socket) => {
    registerStudentHandlers(io, socket);
}

const teacher = io.of("/teacher");
const studentSocket = io.of("/student");





teacher.on("connection", (socket) => {
    socket.on("join:class", async (payload) => {
        socket.join(payload.lesson);
        console.log("teacher connected");


        const clients = await studentSocket.in(socket.handshake.query.lesson).fetchSockets();
        let students = [];
        for (const socket of clients) {
            console.log('user---', socket.id);
            students.push({ id: socket.id, name: socket.handshake.auth.name, student_class_id: socket.handshake.auth.id });
            // console.log(socket.handshake);
            // console.log(socket.rooms);
            // console.log(socket.data);
            // socket.emit(/* ... */);
            // socket.join(/* ... */);
            // socket.leave(/* ... */);
            // socket.disconnect(/* ... */);
        }
        socket.emit('student:list', students);
    })
    socket.on('class:state', (payload) => {
        console.log(payload)
        studentSocket.to(socket.handshake.query.lesson).emit("class:state", payload);
        console.log(payload);
        setState(socket.handshake.query.school, socket.handshake.query.lesson, socket.handshake.query.subject, payload);
    })
    socket.on('get:student', async () => {
        const clients = await studentSocket.in(socket.handshake.query.lesson).fetchSockets();
        let students = [];
        for (const socket of clients) {
            console.log('user---', socket.id);
            students.push({ id: socket.id, name: socket.handshake.auth.name, student_class_id: socket.handshake.auth.id });
            // console.log(socket.handshake);
            // console.log(socket.rooms);
            // console.log(socket.data);
            // socket.emit(/* ... */);
            // socket.join(/* ... */);
            // socket.leave(/* ... */);
            // socket.disconnect(/* ... */);
        }
        socket.emit('student:list', students);
    })

    socket.on('disconnect', () => {
        console.log('teacher disconnect')
    })
});
studentSocket.on("connection", (socket) => {
    socket.on('join:class', async (payload) => {
        socket.join(payload.lesson);
        console.log("student connected");
        let data = await getState(socket.handshake.query.school, socket.handshake.query.lesson, socket.handshake.query.subject);
        console.log(data);
        socket.emit('class:state', JSON.parse(data));
        teacher.to(payload.lesson).emit("get:student");
    })
    socket.on('disconnect', () => {
        console.log('student disconnect')
        teacher.to(socket.handshake.query.lesson).emit("get:student");
    })

});

httpServer.listen(3030, () => {
    console.log("listening on *:3030");
})