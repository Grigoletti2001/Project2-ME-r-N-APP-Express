const express = require('express')
const router = express.Router()
const Journal = require('../models/journal')
const requireAuth = require('../lib/requireAuth')


router.get('/', async (req, res, next) => {
    try {
        const autismUserNames = await Dog.find().populate('user')
        console.log(autismUserNames);
        res.render('journals/index.ejs', {    //need help with this 
            user: autismUserNames,
            userId: req.session.userId
        })
    } catch (err) {
        next(err)
    }
})




router.get('/new', requireAuth, (req, res) => {
    res.render('journals/new.ejs', {
        userId: req.session.userId
    })
})



router.get('/:id', async (req, res, next) => {
    try {
        const autismUserName = await Dog.findById(req.params.id)
            .populate('user')
            .populate('comments.user')

        console.log(autismUserName);
        res.render('journals/show.ejs', {
            dog: autismUserName,
            userId: req.session.userId
        })
    } catch (err) {
        next(err)
    }
})


// since create, exit, update, destroy should all require auth, 
// we can block the rest of this controller 
router.use(requireAuth)

// journals /dogs -- journal create route
router.post('/', async (req, res, next) => {
    try {

        const entryToCreate = {
            name: req.body.name,
            age: req.body.age,
            breed: req.body.breed,
            user: req.session.userId
        }
        const createdEntry = await Dog.create(entryToCreate)

        req.session.message = `${createdEntry.name} successfully added.`
        res.redirect('/dogs/' + createdEntry.id)

    } catch (err) {
        next(err)
    }
})




module.exports = router