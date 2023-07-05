module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs',{ user: req.user});
    },
    getDash: (req,res)=>{
        res.render('dashboard.ejs')
    }
}