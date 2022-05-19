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
        console.log(school_id, class_id, subject_id, lesson_id)
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
        res.status(500).send(error);
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

function setState(live_class_id, state) {
    console.log(live_class_id, state)
    prisma.class.update({
        where: {
            live_class_id,
        },
        data: {
            state: JSON.stringify(state),
        },
    }).then(result => {
        // console.log('prisma result', result)
    }).catch(error => {
        console.log(error)
    })
}

async function getState(live_class_id) {
    let data = await prisma.class.findUnique({
        where: {
            live_class_id: live_class_id
        }
    });
    if (data) {
        return JSON.parse(data.state);
    }
    return {};
}




module.exports = { router, setState, getState }