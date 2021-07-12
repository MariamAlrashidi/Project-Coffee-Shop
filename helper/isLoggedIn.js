module.exports = (req, res, next) => {
    if(!req.cookies.auth)
    {
        res.redirect('/auth/signin');
    }
    else{
        next();
    }
}