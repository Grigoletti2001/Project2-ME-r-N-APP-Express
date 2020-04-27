//requirements

require("dotenv").config();
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const PORT = process.env.PORT;

//db

require("./db/db");

//middleware & seccions

server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(methodOverride("_method"));

// sessions
// this middleware will take session data in server's memory
// and make it available to you by attaching it to the req object
// so in your routes you can access/change it via the req.session object
// and the data will be there on subsequent requests
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    // should the session be rewritten back to the server
    // even if it wasn't modified on this request
    // don't worry about this too much
    resave: false,
    // save session info (and store cookies) without user permission
    // you should legally set this to false
    saveUninitialized: false // GDPR
  })
);

server.use((req, res, next) => {
  // https://expressjs.com/en/api.html#res.locals
  // you can add info to res.locals at any time in the request-response cycle
  // it will be available in the template (unlike session)
  // and it will be cleared out after the response is complete (unlike session)
  res.locals.otherTestMessage = "i set this on res.locals in server.js";
  next();
});

server.use((req, res, next) => {
  console.log("here is the session in my custom app-level middleware");
  console.log(req.session);
  // adding these to res.locals allows us to make our templates
  // more dynamic in the auth area
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.username = req.session.username;
  // you may also want to store user id of logged in user!

  // you can also use this to enhance your FLASH MESSAGING POWERS
  res.locals.message = req.session.message;
  // as before, clear it out so it only appears once
  req.session.message = undefined;

  next();
});

//controllers

const authController = require("./controllers/authController");
server.use("/auth", authController);

const journalController = require("./controllers/journalController");
server.use("/journals", journalController);

// const userController = require('./controllers/userController')
// server.use('/users', userController)

server.get("/", (req, res) => {
  res.render("home.ejs", {
    currentMood: req.session.moodChoice
  });
});

server.get("/mood", (req, res) => {
  console.log(req.session); // you can see the mood here after the user has
  // made a choice

  let currentMood = req.session.moodChoice;
  if (currentMood === undefined) {
    currentMood = "unknown";
  }
  res.render("mood.ejs", {
    currentMood: currentMood
  });
});

server.post("/mood", (req, res) => {
  console.log(req.body.moodChoice, "was clicked");
  // you can store whatever you want in the req.session obj
  // here we'll store the mood the user clicked in req.session
  req.session.moodChoice = req.body.moodChoice;

  res.redirect("/mood");
});

server.get("*", (req, res) => {
  // use res.status to actually add an HTTP status code to your response
  // default is 200 if you don't use res.status
  res.status(404).render("404.ejs");
});

server.listen(3000, () => {
  console.log("Server listening on 3000");
});
