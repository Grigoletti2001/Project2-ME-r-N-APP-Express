const mongoose = require("mongoose");

const quickSchema = mongoose.Schema({
    date: { 
        type: Date, 
        
        default: Date.now()
     },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // dogs must have a user
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