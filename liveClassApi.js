const express = require('express')
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { uuid } = require('uuidv4');

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
// })

// define the home page route
router.get('/', async (req, res) => {
    try {
        const { school_id, class_id, subject_id, lesson_id } = req.query;

        let result = await prisma.class.findMany({
            where: {
                school_id,
                class_id,
                subject_id,
                lesson_id,
            }
        })
        res.send(result)
    } catch (error) {
        console.log(error)
    }


})


// define the about route
router.post('/create', async (req, res) => {
    try {
        const { school_id, lesson_id, class_id, subject_id } = req.body;
        console.log(school_id)
        console.log(lesson_id)
        console.log(class_id)
        console.log(subject_id)
        const result = await prisma.class.create({
            data: {
                school_id,
                class_id,
                lesson_id,
                subject_id,
                live_class_id: uuid()
            }
        });
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})


router.get('/check', async (req, res) => {
    const { school_id, class_id, subject_id, lesson_id } = req.query;
    let result = await prisma.class.findFirst({
        where: {
            school_id,
            class_id,
            subject_id,
            lesson_id,
            active: true
        }
    })
    res.send(result)
})

router.get('/check-live-class', async (req, res) => {
    const { school_id, subject_id, lesson_id, live_class_id } = req.query;
    let result = await prisma.class.findUnique({
        where: {
            school_id,
            subject_id,
            live_class_id,
            lesson_id,
            active: true
        }
    })
    res.status(201).send(result)
})

function setState(school_id, lesson_id, subject_id, live_class_id) {
    prisma.class.update({
        where: {
            school_id,
            lesson_id,
            subject_id,
            live_class_id,
        },
        data: {
            state: 'state',
        },
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
}




module.exports = { router, setState }