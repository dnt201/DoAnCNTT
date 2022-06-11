const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URIS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }). then(con => {
        console.log(`MongoDB connected with HOST: ${con.connection.host}`)
    })
}

module.exports =connectDatabase;