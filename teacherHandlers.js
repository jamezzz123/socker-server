const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let count1 = 0;

module.exports = (io, socket, studentSocket) => {


    console.log(count1++);
    // console.log(socket.id, 'fromTeacher');
    io.on('join:class', (payload) => {
        console.log('joinClass', payload);
    })

    // let result = await prisma.class.findMany({})

    // console.log(result)




    // console.log("socket", socket)
    // console.log("io", io)
    // console.log(socket)
    // console.log(studentSocket)
}