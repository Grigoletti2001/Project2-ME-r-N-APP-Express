const mongoose = require("mongoose");

const journalSchema = mongoose.Schema({


        title: {
            type: String,
            required: true
        },
        
        date: {
            type: Date,

            default: Date.now()
        }, 

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true // dogs must have a user
        },
        intro: {
            type: String, 
            required: true
        }, 
        context: {
            type: String,
            required: true
        }, 
        climax: {
            type: String,
            required: true
        }, 
        acceptance: {
            type: String,
            required: true
        }, 
        conclusion: {
            type: String,
            required: true
        }, 
        emotion: {
            emoji: String,
            included: Boolean, 
            required: true
        }


    });
    




///conenct journal to user (see journal to user... example. )
  
const Journal = mongoose.model ("Journal", journalSchema);

module.exports = Journal; 