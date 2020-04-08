const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt') // this just scrambles data (it is not middleware)
//npm i __b_cry_pt... 

// registration form route: GET /auth/register
router.get('/register', (req, res) => {
    res.render('auth/register.ejs')
})



//register route post auth reg

router.post('/register', async (req, res, next) => {

    try {
        // create a user in the database
        console.log(req.body);
        const desiredUsername = req.body.username
        const desiredPassword = req.body.password



        // verify if account exists already

        const userWithThisUsername = await User.findOne({
            username: desiredUsername
        })
  
        console.log(userWithThisUsername);


        // if username is taken  -- 
        if (userWithThisUsername) { 

            // taken
            console.log("username exists")
            req.session.message = `Username ${desiredUsername} already taken.`
            res.redirect('/auth/register')

        }
        // else you can use it
        else {
            
//using salt. 

            const salt = bcrypt.genSaltSync(10) 
//this can be generated manually, but using bcrypt eases the processus. 

            const hashedPassword = bcrypt.hashSync(desiredPassword, salt)
            //note no const password.  we never store the true password on our side. we only have the hashed password and username. 

            const createdUser = await User.create({
                username: desiredUsername,
                password: hashedPassword
            })
            // the full obj of the created user = un + hashed pw. 

            //cookie monster&  sessions 

            req.session.loggedIn = true
            req.session.userId = createdUser._id // "more unique"
            req.session.username = createdUser.username

            req.session.message = `Thanks for signing up, ${createdUser.username}`
            res.redirect('/')

        }

    } catch (error) {
        next(error)
    }

})

//get 

router.get('/login', (req, res) => {
    // https://expressjs.com/en/api.html#res.locals
    // you can add info to res.locals at any time in the request-response cycle 
    // it will be available in the template (unlike session)
    // and it will be cleared out after the response is complete (unlike session)
    // res.locals.testMessage = "hello this is a test only visible on login page i set this with res.locals in GET /auth/login"

    res.render('auth/login.ejs')
})

// process login POST /auth/login 
router.post('/login', async (req, res, next) => {

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

        // else // i.e. user w/ this username exists
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
                // message: invalid un or pw
                req.session.message = "Invalid username or password."
                // redirect to /auth/login
                res.redirect('/auth/login')
            }

        } // user exists (else)

    } catch (err) {
        next(err)
    }

})


//logout 

router.get('/logout', async (req, res) => {
    // since the session is where the info is stored that makes the user "logged in"
    // we can "log them out" by just destroying the session
    await req.session.destroy()
    res.redirect('/auth/login')
})








module.exports = router