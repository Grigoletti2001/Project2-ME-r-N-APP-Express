const express = require('express')
const router = express.Router()
const Journal = require('../models/journal')
const User = require('../models/user')

// GET /users/:userId/dogs
router.get('/:userId/journal', async (req, res, next) => {
    try {
        const journalEntries = await Journal.find({ user: req.params.userId }).populate('user')
 
        const user = await User.findById(req.params.userId)

        res.render('users/.ejs', {
            user: user,
            userId: user.id
        })

    } catch (err) {
        next(err)
    }
})

module.exports = router