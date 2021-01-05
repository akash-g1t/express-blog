const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");


// Index Url
router.get("/", indexController.index);


// About Url
router.get("/about", indexController.about);


// About Url
router.get("/foreach", indexController.foreach);

module.exports = router;