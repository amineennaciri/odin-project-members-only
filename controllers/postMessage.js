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
    deleteMessage: async (req, res, next)=>{
        console.log(req.body.messageIdFromJSFile)
        try{
            await Message.findOneAndDelete({_id:req.body.messageIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
}