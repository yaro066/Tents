const express = require('express')
const router = express.Router({ mergeParams: true })
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const methodOverride = require('method-override')
const reviews=require('../controllers/reviews')

const { reviewSchema } = require('../schemas')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

const Review = require('../models/review')
const Campground = require('../models/campground')


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router