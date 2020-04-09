const mongoose = require('mongoose')

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

    



}, {timestamp: true}); 









const User = mongoose.model('User', userSchema)

module.exports = User