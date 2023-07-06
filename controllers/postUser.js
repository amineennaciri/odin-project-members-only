const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const validator = require('validator');

const logInMiddleware = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

module.exports = {
    getSignUp: (req,res)=>{
        res.render('signUp.ejs');
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
    postLogIn: (req, res, next)=> {
      /* console.log('postLogIn is working');
      passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/dashboard"
    })
      console.log(`passport checked`);
      res.redirect('/'); */
      logInMiddleware(req, res, next);
    },
    getLogOut: (req, res, next) => {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    },
    postClub: async(req,res,next)=>{
      if(req.user.membershipStatus==='true'){
        if(req.body.passmods==='iowntheapp'){
          const selectedUser = await User.findOne({ _id: req.user._id });
          selectedUser.adminStatus = true;
          await selectedUser.save();
          res.redirect("/");
        }else{
          req.flash('errors', { msg: 'Passmods is wrong, please try again.' });
          res.redirect("/club");
        }
      }else{
        //console.log();
        if(req.body.passcode==='membersonly'){
          const selectedUser = await User.findOne({ _id: req.user._id });
          selectedUser.membershipStatus = true;
          await selectedUser.save();
          res.redirect("/");
        }else{
          req.flash('errors', { msg: 'Passcode is wrong, please try again.' });
          res.redirect("/club");
        }
      }
    },
}