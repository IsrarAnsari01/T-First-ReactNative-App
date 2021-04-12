const ReaderModel = require("./readerModel")
const EncryptionPassword = require("../encriptionPassword/EncryptionPassword")
module.exports.createNewReader = function (req, res) {
    let userData = { "name": req.body.name, "gender": req.body.gender, "age": req.body.age, "userAvatar": req.body.userAvatar, "email": req.body.email , "isBlackListed": req.body.isBlackListed}
    EncryptionPassword.EncryptionPassword(req.body.password)
    .then(encryptedPassword => {
        userData.password = encryptedPassword
        console.log(userData)
    })
    ReaderModel.createNewReader(userData)
        .then(reader => {
            res.send({ status: true, reader: reader })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to create new reader" })
        })
}

module.exports.getAllReaders = function (req, res) {
    ReaderModel.findWithQuery({})
        .then(readers => {
            res.send({ status: true, readers: readers })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find readers" })
        })

}

module.exports.getBlacklistedReaders = function (req, res) {

    ReaderModel.findWithQuery({ isBlackListed: true })
        .then(readers => {
            res.send({ status: true, readers: readers })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find blacklisted readers" })
        })
}

module.exports.getSingleUser = (req, res) => {

    ReaderModel.findSingleWithQuery({ _id: req.params.id })
        .then(reader => {
            res.send({ status: true, reader: reader })
        })
        .catch(err => {
            res.send({ status: false, message: "Unable to find reader" })
        })
}