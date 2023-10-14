const Tour = require("../model/Tour");
const Hotel = require("../model/Hotel");
const Car = require("../model/Car");

const countByCity = async (req, res, next) => {
  try {
    const regionsOfAzerbaijan = [
      "Baku",
      "Ganja",
      "Lankaran",
      "Ismayilli",
      "Gabala",
      "Oguz"
    ];

    const countPromises = regionsOfAzerbaijan.map(async (city) => {
      const [hotelCount, tourCount, carCount] = await Promise.all([
        Hotel.countDocuments({ city }).lean().exec(),
        Tour.countDocuments({ city }).lean().exec(),
        Car.countDocuments({ city }).lean().exec()
      ]);

      return { city, hotels: hotelCount, tours: tourCount, cars: carCount };
    });

    const counts = await Promise.all(countPromises);

    res.status(200).json({ counts });
  } catch (err) {
    next(err);
  }
};


module.exports = countByCity;
