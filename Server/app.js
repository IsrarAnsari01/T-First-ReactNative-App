const express = require('express');
const multer = require("multer")
const bodyParser = require('body-parser');
const cors = require('cors');
const dbHelper = require('./dbHelpers/dbHelper')
const upload = multer({});
const app = express();
const port = process.env.PORT || 9000;


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "20mb"}));
// , upload.single('coverImage')

app.use('/readers', require('./modules/readers/readerRoutes'))
app.use('/books',require('./modules/books/bookRoutes'))

app.get("*", (req, res) => {
    res.send("<h1>Welcome to Library Management System.</h1>")
})

app.listen(port, (err) => {
    if (err) {
        console.log("Error in listening at " + port);
        console.log(err);
        return;
    }
    console.log("Server initiated..!")
    dbHelper.connectWithDB()
})