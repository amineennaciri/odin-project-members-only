module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getDash: (req,res)=>{
        res.render('dashboard.ejs')
    }
}