const express = require('express')
const router = express.Router()
const Journal = require('../models/dog')
const User = require('../models/user')

// GET /users/:userId/dogs
router.get('/:userId/dogs', async (req, res, next) => {
    try {
        const journalEntries = await Dog.find({ user: req.params.userId }).populate('user')
        // you could (And probably should) also just get this information 
        // with .populate('user' on the previous query)
        const user = await User.findById(req.params.userId)

        res.render('users/dogList.ejs', {
            user: user,
            dogs: journalEntries,
            userId: user.id
        })

    } catch (err) {
        next(err)
    }
})

module.exports = router