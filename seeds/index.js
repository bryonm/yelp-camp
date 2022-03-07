const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          author: '61fc2b3494b4c6c8e53cebfb',
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque corporis, sed nisi atque repellendus repudiandae nemo aliquam eius error. Sapiente beatae adipisci odio reprehenderit, vero doloribus totam natus quisquam doloremque.',
          price,
          images: [
            {
              url: 'https://res.cloudinary.com/dy2qzh7gt/image/upload/v1646068040/YelpCamp/mzxheh0ivwxgmkmwvjia.jpg',
              filename: 'YelpCamp/mzxheh0ivwxgmkmwvjia',
            },
            {
              url: 'https://res.cloudinary.com/dy2qzh7gt/image/upload/v1646068041/YelpCamp/moyqdbeyffu99ajvts8m.jpg',
              filename: 'YelpCamp/moyqdbeyffu99ajvts8m',
            },
            {
              url: 'https://res.cloudinary.com/dy2qzh7gt/image/upload/v1646068043/YelpCamp/aisysvrvp7nbdzz7ieio.jpg',
              filename: 'YelpCamp/aisysvrvp7nbdzz7ieio',
            },
          ],
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close(); 
})