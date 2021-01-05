// blog_index, blog_detail, blog_create_get, blog_create_post, blog_delete_get, blog_delete_delete

const Blog = require("../models/blog");
const { check, validationResult } = require("express-validator");


// Paginated
const blog_index = async (req, res) => {
    const { page = 1, limit = 10} = req.query;
    const blogs = await Blog.find().limit(limit*1).skip((page-1)*limit);

    const nextBlogsLength = await Blog.find().limit(limit*1).skip((page)*limit);

    const next = nextBlogsLength.length > 0 ? true : false;
    console.log(next);

    const context = {
        blogs,
        next,
        page
    }

    res.render("blog/index", context)
};


const blog_detail = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
    
        const context = {
            blog
        };
        res.render("blog/single", context);
        
    } catch (error) {
        res.redirect("/blog");
    }
};


const blog_create_get = async (req, res) => {
    res.render("blog/create")
};


const blog_create_post = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.redirect("/blog/create")
    }

    const blog = new Blog(req.body);

    await blog.save();

    res.redirect("/blog");
};


const blog_delete_get = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        await Blog.deleteOne(blog);
        
    } catch (error) {
        res.redirect("/blog");
    }

    res.redirect("/blog");
};


const blog_delete_delete = async (req, res) => {
    try {
        
        await Blog.findByIdAndDelete(req.params.id);
    
        res.status(200).json({ redirect: "/blog"});
    } catch (error) {
        res.status(404).json({msg: "No blog found!"})
    }
};



module.exports = {
    blog_index,
    blog_detail,
    blog_create_get,
    blog_create_post,
    blog_delete_get,
    blog_delete_delete
};
