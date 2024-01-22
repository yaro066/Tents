const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user')
const users = require('../controllers/users')



router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))


router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login)


router.get('/logout', users.logout);

module.exports = router
//failure redirect has been added in order to save redirection


//New logout (now async) >>>>>>
//<<

// Old code :>>
// router.get('/logout',(req,res)=>{
//     req.logout()
//     req.flash('success','Succesfully logged out')
//     res.redirect('/campground')
// })
//<<
