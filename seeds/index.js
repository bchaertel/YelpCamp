const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database connection error");
    console.log(err);
  });
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "669ebbcb2d2f59c877b95d77",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dpjo4a1ci/image/upload/v1721670793/camping6_rsjno5.jpg",
          filename: "YelpCamp/camping6_rsjno5",
        },
        {
          url: "https://res.cloudinary.com/dpjo4a1ci/image/upload/v1721329942/YelpCamp/h6ixe9ljbyhsdtakqafs.jpg",
          filename: "YelpCamp/h6ixe9ljbyhsdtakqafs",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("connection closed");
});
