const bcrypt = require('bcryptjs');
const User = require('./../models/user');
module.exports = {
    getSignUp: (req,res)=>{
        res.render('signUp.ejs')
    },
    postSignUp: async (req, res, next)=>{
        bcrypt.hash(req.body.password, 10, async   (err, hashedPassword) => {
          try {
            const user = new User({
              firstName: req.body.firstN,
              lastName: req.body.lastN,
              email:req.body.email,
              password: hashedPassword,
            });
            const result = await user.save();
            res.redirect("/");
          } catch(err) {
            return next(err);
          };
        });
    },
}