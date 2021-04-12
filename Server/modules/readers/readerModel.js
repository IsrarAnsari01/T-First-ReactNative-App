const mongoose = require('mongoose');
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
const ReaderSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    password: String,
    email: String,
    userAvatar: String,
    addedOn: {type: String , default: TodayDate},
    isBlackListed: Boolean
})


const ReaderModel = new mongoose.model('readers', ReaderSchema)

module.exports.createNewReader = (readerDetails) => {

    return new Promise((resolve, reject) => {
        const newReader = new ReaderModel(readerDetails)

        newReader.save((err, reader) => {
            if (err) {
                console.log("Unable to create new reader");
                console.log(err);
                reject(err);
            }
            resolve(reader);
        })

    })
}

module.exports.findWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        ReaderModel.find(query)
            .then(readers => {
                resolve(readers)
            })
            .catch(err => {
                console.log("Unable to find readers, query ", query);
                console.log(err);
                reject(err)
            })
    })
}

module.exports.findSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        ReaderModel.findOne(query)
            .then(reader => {
                resolve(reader)
            })
            .catch(err => {
                console.log("Unable to find reader, query ", query);
                console.log(err);
                reject(err)
            })
    })
}


