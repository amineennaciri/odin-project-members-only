module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs',{ user: req.user});
    },
    getMessage: (req,res)=>{
        res.render('dashboard.ejs',{ user: req.user})
    }
}