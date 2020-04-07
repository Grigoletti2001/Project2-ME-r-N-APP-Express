const mongoose = require("mongoose");

const quickSchema = mongoose.Schema({
    date: { 
        type: Date, 
        
        default: Date.now()
     },

   
    entry: { 
        type: String,
        required: true
    }, 

    emotion: {
        emoji: String, 
        included: Boolean
    });
    


  
const Quick = mongoose.model ("Quick", quickSchema);

module.exports = Quick; 