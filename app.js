const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

// Connecting to database
const DBURI = 'mongodb+srv://testing1234:testing1234@cluster0.cpwfq.mongodb.net/Cluster0?retryWrites=true&w=majority'
mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`)))
    .catch(err => console.log(err))

// Setting EJS View Engine
app.set("view engine", "ejs") // By default it will look files in "views" directory

// setting static files
app.use(express.static("public"));

// Middlewares
app.use(morgan("dev"));

app.use(express.urlencoded({extended: true}))

//custom Middlewares
// app.use( async (req, res, next) => {
//     console.log("New Request Made");
//     console.log(`host: ${req.hostname}`);
//     console.log(`path: ${req.path}`);
//     console.log(`method: ${req.method}`);

//     // Going to next middleware
//     next();
// });

// app.use( async (req, res, next) => {
//     console.log(`Now in a different middleware!`);

//     // Going to next middleware
//     next();
// });




// Importing routes
const indexRouter = require("./routes/index");
const blogRouter = require("./routes/blog");

app.use("/", indexRouter);
app.use("/blog", blogRouter);



// 404 Page is set as middle ware but also at the bottom so that
// it will get fired up if there's no "URL" in the above functions
app.use((req, res) => {
    res.send("404 Not Found!")
});