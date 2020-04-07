const mongoose = require("mongoose");

const journalSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now() },
    title: {
        String,
        required: true
    },
   
    entry: { 
        type: String,
        required: true
    }, 


    emotion: {
        emoji: String, 
        included: Boolean
    });
    


  
const Journal = mongoose.model ("Journal", journalSchema);

module.exports = Journal; 