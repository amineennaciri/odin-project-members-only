const passport = require('passport');
const User = require('./../models/user');
const Message = require('./../models/message');

module.exports = {
    postMessage: async (req, res, next)=>{
        const message = new Message({
            title: req.body.title,
            textMsg: req.body.textMsg,
            author: req.user._id,
          });
          const result = await message.save();
          res.redirect("/");
    },
}