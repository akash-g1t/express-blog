// blog_index, blog_detail, blog_create_get, blog_create_post, blog_delete_get, blog_delete_delete

const Blog = require("../models/blog");
const { check, validationResult } = require("express-validator");

const blog_index = async (req, res) => {
    const blogs = await Blog.find();

    const context = {
        blogs
    }

    res.render("blog/index", context)
};


const blog_detail = async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    const context = {
        blog
    };
    res.render("blog/single", context);
};


const blog_create_get = async (req, res) => {
    res.render("blog/create")
};


const blog_create_post = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect("/blog/create")
    }

    const blog = new Blog(req.body);

    await blog.save();

    res.redirect("/blog");
};


const blog_delete_get = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    await Blog.deleteOne(blog);

    res.redirect("/blog");
};


const blog_delete_delete = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ redirect: "/blog"});
};



module.exports = {
    blog_index,
    blog_detail,
    blog_create_get,
    blog_create_post,
    blog_delete_get,
    blog_delete_delete
};