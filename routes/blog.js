const { request } = require("express");
const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const Blog = require("../models/blog")

// Index Blog Url
router.get("/", async (req, res) => {
    const blogs = await Blog.find();

    // console.log(blogs.length);
    // console.log(typeof (blogs));

    // Slicing OR Limiting the amount of objects
    // let sliced = [];
    // for (let i=0; i<blogs.length && i<2; i++) {
    //     sliced.push(blogs[i]);
    // }
    // console.log("Sliced are : ", sliced)

    const context = {
        blogs
    }

    res.render("blog/index", context)
});

// Get Single Blog Url
router.get("/single/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    const context = {
        blog
    };
    res.render("blog/single", context);

})


// Create Blog Form Url
router.get("/create", async (req, res) => {
    res.render("blog/create")
});

// Create Blog Url
router.post("/create", [

    // Validation with express-validation package ( Optional )
    check("title").isLength({ min: 5, max: 10 }).notEmpty(),
    check("snippet").notEmpty(),
    check("body").isLength({ min: 15}).notEmpty()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect("/blog/create")
    }

    const blog = new Blog(req.body);

    await blog.save();

    res.redirect("/blog");
});

// Delete Blog with web GET request
router.get("/delete/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    await Blog.deleteOne(blog);

    res.redirect("/blog");
});

// Delete Blog with ajax DELETE request
router.delete("/remove/:id", async (req, res) => {
    console.log("Inside this function");
    
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ redirect: "/blog"});
});



module.exports = router;