const Message = require('./../models/message');

module.exports = {
    getIndex: async (req,res)=>{
        try{
            if(req.user){
                console.log('didwork');
                //const usersMessage = await Message.find({author:req.user._id});
                const allMessages = await Message.find();
                res.render('index.ejs',{ user: req.user, messages: allMessages});
            }
            else{
                console.log('didntwork')
                res.render('index.ejs',{ user: req.user});
            }
        }catch(err){
            console.log(err);
        }
    },
    getMessage: (req,res)=>{
        res.render('dashboard.ejs',{ user: req.user});
    },
    getClub: (req,res)=>{
        res.render('club.ejs',{ user: req.user});
    }
}