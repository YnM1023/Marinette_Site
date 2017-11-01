//=========================================
//  Variables and Sets 
//=========================================

// For Packages Used in This Web
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    methodOverride  = require("method-override"),
    LocalStrategy   = require("passport-local");

    
// Models Used in this Web
var User    = require("./models/user");
var Blog    = require("./models/blog");
var Comment = require("./models/comment");
var seedDb  = require("./seeds");


// Create db in Mongoose for This Web
var url = process.env.DATABASEURL || "mongodb://localhost/first_blog_v1"
mongoose.connect(url);
// seedDb();

// Necessary Sets for Code
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());

//=========================================
//  Passport Configuration
//=========================================
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//=========================================
//  Requiring Routes
//=========================================

var indexRoutes     = require("./routes/index");
var blogsRoutes     = require("./routes/blogs");
var picturesRoutes  = require("./routes/pictures");
var commentsRoutes  = require("./routes/comments");
var gamesRoutes     = require("./routes/games");
var algorithmsRoutes = require("./routes/algorithms");
var messageRoutes   = require("./routes/messages");

app.use("/",indexRoutes);
app.use("/blogs",blogsRoutes);
app.use("/pictures",picturesRoutes);
app.use("/pictures/:id/comments",commentsRoutes);
app.use("/",gamesRoutes);
app.use("/algorithms",algorithmsRoutes);
app.use("/algorithms/:id/messages",messageRoutes);

app.get("*",function(req,res){
    res.send("not found!");
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Blog Web Has Started!");
});