const Campground = require('../models/campground')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })
const { cloudinary } = require('../cloudinary')

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({}).populate('author');
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {

    res.render('campgrounds/new')
}

module.exports.createCampground = async (req, res, next) => {
    // if(!req.body.campground)throw new ExpressError ('Invalid Campgroud data...')
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', 'Campground added succesfully');
    res.redirect(`/campground/${campground._id}`);


}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate({ path: 'author' })
    if (!campground) {
        req.flash('error', 'Campground does not exist')
        return res.redirect('/campground')
    }
    res.render('campgrounds/show', { campground, msg: req.flash('success') })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Campground does not exist')
        return res.redirect('/campground')
    }
    res.render('campgrounds/edit', { campground })
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    const img = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.images.push(...img)
    await campground.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Succesfully updated campground')
    res.redirect(`/campground/${campground._id}`)

}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Campground succesfully deleted')
    res.redirect('/campground')
}