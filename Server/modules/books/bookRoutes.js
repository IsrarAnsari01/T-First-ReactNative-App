const express = require("express");
const router = express.Router();
const controller = require("./bookController")

router.post("/", controller.createNewBook)
router.get("/", controller.getAllBooks)
router.get("/:id", controller.getSelectedBook)
router.post("/addNewLender", controller.addNewLender)
router.post("/setAsReturned", controller.setAsReturned)

module.exports = router;