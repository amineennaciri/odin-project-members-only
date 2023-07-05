const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const validator = require('validator');
module.exports = {
    getSignUp: (req,res)=>{
        res.render('signUp.ejs')
    },
    getLogIn: (req,res)=>{
      res.render('logIn.ejs')
  },
    postSignUp: async (req, res, next)=>{
      const validationErrors = []
      if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
      if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
      if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
      if (validationErrors.length) {
        req.flash('errors', validationErrors)
        return res.redirect('../signup')
      }
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
      bcrypt.hash(req.body.password, 10, async   (err, hashedPassword) => {
        try {
          const existingUser = await User.findOne({
            $or: [
              { email: req.body.email },
              { firstName: req.body.firstN },
              { lastName: req.body.lastN }
            ]
          });
          if (existingUser) {
            req.flash('errors', { msg: 'Account with that email address or username already exists.' });
            return res.redirect('../signup');
          }
          const user = new User({
            firstName: req.body.firstN,
            lastName: req.body.lastN,
            email:req.body.email,
            password: hashedPassword,
          });
          //await user.save();
          //await req.logIn(user);
          const result = await user.save();
          res.redirect("/");
        } catch(err) {
          return next(err);
        };
      });
    },
    postLogIn: async (req, res, next)=>{
      const validationErrors = []
      if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
      if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });
      if (validationErrors.length) {
        req.flash('errors', validationErrors)
        return res.redirect('/login')
      };
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
      // if the authentication is successful, we send a message 'Sucess! You are logged in.' and we redirect them to the todos page.
      try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
          req.flash('errors', { msg: `Account with that email address isn't registered, please sign up.`});
          return res.redirect('/login');
        };
        bcrypt.compare(req.body.password, user.password, async   (err, res) => {
        if (!res) {
          req.flash('errors', { msg: `Incorrect password.`});
          //done(null, false);
          return res.redirect('/login');
        };
        if (res) {
          //done(null, user);
          return res.redirect('/dashboard');
        }})
          // if the authentication is successful, we send a message 'Sucess! You are logged in.' and we redirect them to the todos page.
    passport.authenticate('local', async (err, user, info) => {
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/dashboard')
      })
      })
      }catch (err){
        return next(err);
      }
    },
}