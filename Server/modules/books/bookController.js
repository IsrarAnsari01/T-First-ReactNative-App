const BookModel = require("./bookModel");
module.exports.createNewBook = (req, res) => {
    let data = { "title": req.body.title, "author": req.body.author, "genre": req.body.genre, "tagLine": req.body.tagLine, "coverImageURL": req.body.coverImageURL }
    console.log(data)
    BookModel.createNewBook(data)
        .then(succ => {
            res.send({ status: true, bookDetails: "Successfully Upload Book" })
        })
        .catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.getAllBooks = (req, res) => {
    BookModel.findWithQuery()
        .then(books => {
            res.send({ status: true, books: books })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find books" })
        })
}

module.exports.getSelectedBook = (req, res) => {

    BookModel.findSingleWithQuery({ _id: req.params.id })
        .then(book => {
            res.send({ status: true, book: book })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find book" })
        })
}

module.exports.addNewLender = (req, res) => {

    console.log("updated book ID ", req.body.bookId);

    let updates = {
        $push: {
            lendingHistory: {
                lendedOn: new Date(),
                lendedById: req.body.lenderId,
                lendedByName: req.body.lenderName
            }
        }
    }

    BookModel.updateSingleBook({ _id: req.body.bookId }, updates)
        .then(updates => {
            res.send({ status: true })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to update book" })
        })
}


module.exports.setAsReturned = (req, res) => {
    console.log("setAsReturned - updated book ID ", req.body.bookId);
    console.log("setAsReturned - updated book ID ", req.body.lenderId);

    let updates = {
        $set: {
            "lendingHistory.$.returnedOn": new Date()
        }
    }
    let query = {
        _id: req.body.bookId,
        'lendingHistory.lendedById': req.body.lenderId
    }

    console.log("Query ", query)
    BookModel.updateSingleBook(query, updates)
        .then(updates => {
            res.send({ status: true })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to update book" })
        })
}
