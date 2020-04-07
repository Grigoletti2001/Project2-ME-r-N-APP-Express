const mongoose = require('mongoose')
//const crypto = require ('crypto')//
// to include models before routes so that routes will be able to use models.



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,

    lastName: String,

    email: String,  

    diagnosis: String, 
    
    hash: String, 

    salt: String


}, {timestamp: true}); 









const User = mongoose.model('User', userSchema)

module.exports = User