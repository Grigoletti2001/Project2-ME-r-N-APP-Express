//requirements 

require('dotenv').config()
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const PORT = process.env.PORT


//db

require('./db/db')


//sessions
server.use(session({
    secret: process.env.SESSION_SECRET,
    // should the session be rewritten back to the server
    // even if it wasn't modified on this request
    resave: false,
    // save session info (and store cookies) without user permission
  
    saveUninitialized: false 
    // GDPR**** very important 
}))

server.use((req, res, next) => {
    // https://expressjs.com/en/api.html#res.locals
    // you can add info to res.locals at any time in the request-response cycle 
    // it will be available in the template (unlike session)
    // and it will be cleared out after the response is complete (unlike session)
    res.locals.otherTestMessage = "i set this on res.locals in server.js"
    next()
})


server.use((req, res, next) => {
    console.log("here is the session in my custom app-level middleware");
    console.log(req.session)
    // adding these to res.locals allows us to make our templates
    // more dynamic in the auth area
    res.locals.loggedIn = req.session.loggedIn
    res.locals.username = req.session.username
    // you may also want to store user id of logged in user!

    // you can also use this to enhance your FLASH MESSAGING POWERS
    res.locals.message = req.session.message
    // as before, clear it out so it only appears once
    req.session.message = undefined

    next()
})




//middlewares



server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false }))




//7 restful routes 



//controllers

server.listen(3000, () => {

   console.log("Server listening on 3000"); 
 })


