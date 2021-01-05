const express = require("express");
const router = express.Router();

const { check } = require("express-validator");


const blogController = require("../controllers/blogController");

// Index Blog Url
router.get("/", blogController.blog_index);

// Get Single Blog Url
router.get("/single/:id", blogController.blog_detail)


// Create Blog Form Url
router.get("/create", blogController.blog_create_get);



// Create Blog Url
router.post("/create", [

    // Validation with express-validation package ( Optional )
    check("title").isLength({ min: 5, max: 10 }).notEmpty(),
    check("snippet").notEmpty(),
    check("body").isLength({ min: 15}).notEmpty()

], blogController.blog_create_post);


// Delete Blog with web GET request
router.get("/delete/:id", blogController.blog_delete_get);


// Delete Blog with ajax DELETE request
router.delete("/remove/:id", blogController.blog_delete_delete);



module.exports = router;