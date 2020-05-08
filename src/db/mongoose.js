const mongoose = require('mongoose')

//This url is basically the same as the one setup for mongodb
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true  //Makes the database create indexes - not much info given about this in course
})