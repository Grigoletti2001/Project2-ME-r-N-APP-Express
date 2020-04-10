const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt') // this just scrambles data (it is not middleware)

// registration form route: GET /auth/register
router.get('/register', (req, res) => {
    res.render('views/auth/register.ejs')
})


// register route: POST /auth/register
router.post('/auth/register.ejs', async (req, res, next) => {

    try {
        // create a user in the database
        console.log(req.body);
        const desiredUsername = req.body.username
        const desiredPassword = req.body.password

        // but first! see if an account already exists with this username
        const userWithThisUsername = await User.findOne({
            username: desiredUsername
        })
        // let's see what we get
        console.log(userWithThisUsername);
        // ^^ note -- findOne will return NULL if it doesn't find anything
        // (.find() would return an empty array)

        // if username is taken  -- 
        if (userWithThisUsername) { // this works bc null is falsey and 
            // an object is truthy

            // tell them no -- it's taken (use session)
            console.log("username exists")
            req.session.message = `Username ${desiredUsername} already taken.`
            res.redirect('/auth/register')

        }
        // else // i.e. username is available
        else {
            // create the user

            // encrypt the password with bcrypt
            // "salt" is like an extra "ingredient" in the encryption process
            const salt = bcrypt.genSaltSync(10) // 10 is a nice reasonable value
            // higher val = more secure but slower

            const hashedPassword = bcrypt.hashSync(desiredPassword, salt)


            const createdUser = await User.create({
                username: desiredUsername,
                password: hashedPassword
            })

            // SAVE THE FACT THAT THEY ARE LOGGED IN TO THE SESSION
            // this is how you "log them in"
            req.session.loggedIn = true
            // helpful to store something that uniquely identifies the user
            // like id, or username, or both
            req.session.userId = createdUser._id // "more unique"
            req.session.username = createdUser.username

            // res redirect etc
            // later we will redirect to home 
            req.session.message = `Thanks for signing up, ${createdUser.username}`
            res.redirect('/')

        }

    } catch (error) {
        next(error)
    }

})

// login routes

// show form GET /auth/login
router.get('views/auth/login', (req, res) => {
    // https://expressjs.com/en/api.html#res.locals
    // you can add info to res.locals at any time in the request-response cycle 
    // it will be available in the template (unlike session)
    // and it will be cleared out after the response is complete (unlike session)
    // res.locals.testMessage = "hello this is a test only visible on login page i set this with res.locals in GET /auth/login"

    res.render('views/auth/login.ejs')
})

// process login POST /auth/login 
router.post('views/auth/login.ejs', async (req, res, next) => {

    try {
        // is there a user with this username? 
        const user = await User.findOne({ username: req.body.username })

        // if not
        if (!user) {
            // user does not exist
            console.log("bad username");
            // message: bad username or password
            req.session.message = "Invalid username or password."
            // redirect to login page so they can reattempt   
            res.redirect('/auth/login')

        }

        else {
            const loginInfoIsValid = bcrypt.compareSync(req.body.password, user.password)

            if (loginInfoIsValid) {
                // log them in in session
                req.session.loggedIn = true
                req.session.userId = user._id
                req.session.username = user.username

                // set message welcome back
                req.session.message = `Welcome back, ${user.username}!`
                // redirect to /
                res.redirect('/')

            }
            // else // i.e. pw is bad
            else {
                console.log("bad password");
                req.session.message = "Invalid username or password."
                // redirect to /auth/login
                res.redirect('/auth/login')
            }

        } // user exists (else)

    } catch (err) {
        next(err)
    }

})


router.get('/logout', async (req, res) => {
    // since the session is where the info is stored that makes the user "logged in"
    // we can "log them out" by just destroying the session
    await req.session.destroy()
    res.redirect('/auth/login')
})




module.exports = router