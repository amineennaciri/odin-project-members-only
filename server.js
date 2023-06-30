const express = require('express');
const app = express();
const mongoose = require("mongoose");
const ejs = require('ejs');
const bcrypt = require('bcryptjs');
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mainRoutes = require('./routes/index');
const postRoutes = require('./routes/post');
const connectDB = require("./config/database");
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
require('./config/passport')(passport);
//Connect To Database
connectDB();
app.use(passport.initialize());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

app.use(passport.session());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/", mainRoutes);
app.use("/new", postRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})