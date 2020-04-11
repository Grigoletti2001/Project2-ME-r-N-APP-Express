const mongoose = require("mongoose");

const journalSchema = mongoose.Schema({


        title: {
            type: String,
            required: true
        },
        
        date: {
            type: Date,
      
         
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
            type: String, 
            required: false
        }


    });
    




///conenct journal to user (see journal to user... example. )
  
const Journal = mongoose.model ("Journal", journalSchema);

module.exports = Journal; 