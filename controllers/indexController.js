// index, about, foreach

const { model } = require("mongoose");

const index = async (req, res) => {
    res.render("index");
};

const about = async(req, res) => {
    const context = {
        name: "Akash",
        via: "Context"
    }
    res.render("about", context)
};


const foreach = async (req, res) => {
    const blogs = [
        {title : "This is title 1", snippet: "Some snippet for 1"},
        {title : "This is title 2", snippet: "Some snippet for 2"},
        {title : "This is title 3", snippet: "Some snippet for 3"},
        {title : "This is title 4", snippet: "Some snippet for 4"},
    ]

    // try to comment out log in context and look at the 'foreach.ejs' file
    context = {
        blogs
    }
    res.render("foreach", context)
};


module.exports = {
    index,
    about,
    foreach
}