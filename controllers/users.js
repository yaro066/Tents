const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username });
        const newUser = await User.register(user, password)
        console.log(newUser)
        req.login(newUser, err => {
            if (err) return next(err);
            req.flash(' success', 'Welcome to YelpCamp');
            res.redirect('/campground');
        })

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = req.session.returnTo || '/campground'
    delete req.session.returnTo
    res.redirect(`${redirectUrl}`)
}


module.exports.logout = function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Succesfully logged out')
        res.redirect('/campground');
    });
}