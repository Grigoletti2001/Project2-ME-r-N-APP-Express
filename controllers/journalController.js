const express = require("express");
const router = express.Router();
const Journal = require("../models/journal");
const requireAuth = require("../lib/requireAuth");

router.get("/", async (req, res, next) => {
  try {
    const journalData = await Journal.find().populate("user");
    console.log(journalData);
    res.render("journals/index.ejs", {
      //need help with this
      user: journalData,
      userId: req.session.userId,
      title: req.session.title,
      intro: req.session.intro,
      context: req.session.context,
      climax: req.session.climax,
      acceptance: req.session.acceptance,
      conclusion: req.session.conclusion,
      //add journals
      journals: journalData
    });
  } catch (err) {
    next(err);
  }
});

router.get("/new", requireAuth, (req, res) => {
  res.render("journals/new.ejs", {
    userId: req.session.userId
  });
});

router.get("/:id", async (req, res, next) => {
  try {
    const autismUserName = await Journal.findById(req.params.id)
      .populate("user")
      .populate("comments.user");

    console.log(autismUserName);
    res.render("journals/show.ejs", {
      journal: autismUserName,
      userId: req.session.userId
    });
  } catch (err) {
    next(err);
  }
});

// since create, exit, update, destroy should all require auth,
// we can block the rest of this controller
router.use(requireAuth);

// journals /journals -- journal create route
router.post("/", async (req, res, next) => {
  try {
    const entry = {
      title: req.body.title,
      //deleting date-info because doing it client side.
      user: req.session.userId,
      intro: req.body.intro,
      context: req.body.context,
      climax: req.body.climax,
      acceptance: req.body.acceptance,
      conclusion: req.body.conclusion,
      emotion: req.body.emoticon
    };
    const createdEntry = await Journal.create(entry);

    req.session.message = `${createdEntry.name} successfully added.`;
    res.redirect("/journals/" + createdEntry.id);
  } catch (err) {
    next(err);
  }
});

//edit route
router.get("/index/edit", async (req, res, next) => {
  try {
    // query for the article
    const editJournal = await Journal.findById(req.params.id);
    // query for the list of entries
    const foundAuthors = await Author.find({});
    res.render("journals/edit.ejs", {
      journal: editJournal
    });
  } catch (err) {
    next(err);
  }
});

// article update route: PUT /articles/:id
router.put("/:id", async (req, res, next) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // redirect back to article show page so user can see updates
    res.redirect("/journals/" + updatedArticle._id);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
