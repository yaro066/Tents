const express = require('express')
const mongoose = require('mongoose');
const campground = require('../models/campground');
const Campground = require('../models/campground')
const cities = require('./cities.js')
const { places, descriptors } = require('./seedsHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex:true,
    useUnifiedTopology: true
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('database open')
})



const seedDB = async () => {
    await Campground.deleteMany();
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
          //Your user ID!!
            author: '64351fa1f18aed082f3ec81e',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)}${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto laudantium repellendus quae ex, delectus, tempore ad ratione labore fugit, natus fuga recusandae obcaecati. Facere numquam dolorem provident magni vitae labore.',
            price: price,
            geometry:{
              type:"Point",
                coordinates:[
                  cities[random1000].longitude,
                  cities[random1000].latitude
              ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dbd7dhkkp/image/upload/v1681755144/YelpCamp/a0uxnerhw3p8bkksozp0.jpg',
                  filename: 'YelpCamp/a0uxnerhw3p8bkksozp0',
                },
                {
                  url: 'https://res.cloudinary.com/dbd7dhkkp/image/upload/v1681755144/YelpCamp/z8wpoisxknbpcmexwrk6.webp',
                  filename: 'YelpCamp/z8wpoisxknbpcmexwrk6',
                },
                {
                  url: 'https://res.cloudinary.com/dbd7dhkkp/image/upload/v1681755145/YelpCamp/ie3su0rxdjhitt2lvsym.jpg',
                  filename: 'YelpCamp/ie3su0rxdjhitt2lvsym',
                }
              ]

        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})