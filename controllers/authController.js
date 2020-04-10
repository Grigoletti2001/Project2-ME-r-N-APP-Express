
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt') // this just scrambles data (it is not middleware)


router.get('/register', (req, res) => {
    res.render('views/auth/register.ejs')
})


// registration form route: GET /auth/register
router.get('/', async (req, res, next) => {
    try {
        // get ALL the authors from the db
        const allJournals = await Journal.find({})

        // render them in a template
        res.render('views/auth/register.ejs', {
            journals: foundUsers
        })

    } catch (err) {
        next(err)
    }
})

// author new route: GET /authors/new 
router.get('/new', (req, res) => {
    res.render('journals/new.ejs')
})

// author show route: GET /authors/:id -- info for ONE author
router.get('/:id', async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id)
        const foundJournals = await Journal.find({ author: req.params.id })
        res.render('journals/show.ejs', {
            author: foundAuthor,
            articles: foundArticles
        })
    } catch (err) {
        next(err)
    }

}) // router.get('/:id')

// author create route: POST /authors
router.post('/', async (req, res, next) => {
    try {
        // Add author to db
        // we're just using req.body directly -- note that that means 
        // we are giving up a chance to modify it 
        await Author.create(req.body)
        // send them to the index so they can see that the author was added
        res.redirect('/authors')
    } catch (err) {
        next(err)
    }

})

// author destroy route: DELETE /authors/:id
//no delete or destroy route allowed. 

// no edit route needed


// update: PUT /authors/:id (or PATCH /authors/:id)
router.put('/:id', async (req, res, next) => {
    try {
        // shortcut -- we are just using req.body directly here
        // this is quick and dirty, we may need to update it first in some cases
        const updatedJournal = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.redirect(`/authors/${updatedAuthor._id}`)
    } catch (err) {
        next(err)
    }

})



// if you forget to export you will see:
// "expected a middleware function but got a Object" -- why? 









module.exports = router