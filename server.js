const express = require('express');
const app = express();
const mongoose = require("mongoose");
const ejs = require('ejs');
const bcrypt = require('bcryptjs');
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const flash = require('express-flash');
const mainRoutes = require('./routes/main');
const messageRoutes = require('./routes/message');
const connectDB = require("./config/database");
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
require('./config/passport')(passport);
//Connect To Database
connectDB();
app.use(passport.initialize());
// you will have access to the currentUser variable in all of your views, and you won’t have to manually pass it into all of the controllers in which you need it.
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

app.use(passport.session());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// these are the flash alert that works when something isn't working well with our log ins
app.use(flash());

app.use("/", mainRoutes);
app.use("/message", messageRoutes);
/* app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/dashboard"
  })
); */

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})