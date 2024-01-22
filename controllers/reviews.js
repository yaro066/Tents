const Review = require('../models/review')
const Campground = require('../models/campground')


module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Succesfully posted review')
    res.redirect(`/campground/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    //    const campground=await campground.findByID(req.params.id)
    //    const review=await review.findById(req.params.reviewId)
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Succesfully deleted review')
    res.redirect(`/campground/${id}`)
}