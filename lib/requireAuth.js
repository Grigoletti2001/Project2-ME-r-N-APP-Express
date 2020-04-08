module.exports = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        req.session.message = "Please create an account in order to continue!"
        res.redirect('/auth/login')
    }
}