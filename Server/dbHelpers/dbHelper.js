const mongoose = require('mongoose');


module.exports.connectWithDB = () => {
    
    mongoose.connect('mongodb+srv://new_user_02:new_user_022@cluster0.e46ff.mongodb.net/LibraryMS?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.once('error', (err) => {
        console.log("Error in connecting to DB")
        console.log(err);
    });

    db.once('open', () => {
        console.log("Connected to DB successfully..!")
     })

}