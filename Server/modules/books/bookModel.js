const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    title: String,
    genre: String,
    tagLine: String,
    author: String,
    addedOn: { type: Date, default: new Date() },
    coverImageURL: String,
    lendingHistory: [{
        lendedOn: Date,
        lendedById: mongoose.Schema.Types.ObjectId,
        lendedByName: String,
        returnedOn: Date
    }]
})


const BookModel = new mongoose.model('books', BookSchema)

module.exports.createNewBook = (bookDetials) => {

    return new Promise((resolve, reject) => {
        const newBook = new BookModel(bookDetials)

        newBook.save((err, reader) => {
            if (err) {
                console.log("Unable to create new book");
                console.log(err);
                reject(err);
            }
            resolve(reader);
        })
    })
}

module.exports.updateSingleBook = (query, updates) => {

    return new Promise((resolve, reject) => {
        BookModel.updateOne(query, updates)
            .then(updateResponse => {
                console.log("Book Updates successfully ", updateResponse);
                resolve(updateResponse)
            })
            .catch(err => {
                console.log("Unable to update book ");
                console.log(err);
                console.log("Book ID : ", bookId);
                console.log("Updates ", updates)
                reject(err);
            })
    })
}

module.exports.findWithQuery = (query = {}) => {
    return new Promise((resolve, reject) => {
        BookModel.find(query)
            .then(books => {
                resolve(books)
            })
            .catch(err => {
                console.log("Unable to find books, query ", query);
                console.log(err);
                reject(err)
            })
    })
}

module.exports.findSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        BookModel.findOne(query)
            .then(book => {
                resolve(book)
            })
            .catch(err => {
                console.log("Unable to find book, query ", query);
                console.log(err);
                reject(err)
            })
    })
}



