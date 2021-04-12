const express = require('express');
const router = express.Router();
const controller = require("./readerController")

router.get("/", controller.getAllReaders)
router.post("/add-new", controller.createNewReader)
router.get("/bio/:id", controller.getSingleUser)
router.get("/blacklisted", controller.getBlacklistedReaders)

module.exports = router;
