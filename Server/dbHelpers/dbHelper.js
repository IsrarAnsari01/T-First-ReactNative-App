const mongoose = require('mongoose');


module.exports.connectWithDB = () => {
    //new_user_02
    mongoose.connect('mongodb+srv://#######:#######@cluster0.e46ff.mongodb.net/LibraryMS?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.once('error', (err) => {
        console.log("Error in connecting to DB")
        console.log(err);
    });

    db.once('open', () => {
        console.log("Connected to DB successfully..!")
     })

}
