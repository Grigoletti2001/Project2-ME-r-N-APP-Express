const mongoose = require('mongoose'); 



const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log(`connected to database`);
})

mongoose.connection.on('disconnected', () => {
    console.log(`disconnected from database`);
})

mongoose.connection.on('error', (err) => {
    console.log(`error with database connection:`);
    console.log(err)
}) 
