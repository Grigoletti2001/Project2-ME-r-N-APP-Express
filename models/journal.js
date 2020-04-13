const mongoose = require("mongoose");

const journalSchema = mongoose.Schema({
  title: {
    type: String,
    required: false
  },

  date: {
    type: Date
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false // dogs must have a user
  },
  intro: {
    type: String,
    required: false
  },
  emoticonIntro: {
    type: String,
    required: false
  },

  context: {
    type: String,
    required: false
  },
  emoticonContext: {
    type: String,
    required: false
  },

  climax: {
    type: String,
    required: false
  },

  emoticonClimax: {
    type: String,
    required: false
  },

  acceptance: {
    type: String,
    required: false
  },

  emoticonAcceptance: {
    type: String,
    required: false
  },

  conclusion: {
    type: String,
    required: false
  },
  emoticonConclusion: {
    type: String,
    required: false
  }
});

///conenct journal to user (see journal to user... example. )

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
