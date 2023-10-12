const Tour = require("../model/Tour");
const Hotel = require("../model/Hotel");
const Car = require("../model/Car")

const countByCity = async (req, res, next)=>{
 try {
     const cities = ["Baku", "Gabala", "Guba", "Ganja", "Ismayilli"]
    const hotelCount = await Promise.all(
      cities.map((city) => {
        return {city: Hotel.countDocuments({city: city})}
      })
    );

     const tourCount = await Promise.all(
      cities.map((city) => {
        return {city: Tour.countDocuments({city: city})}
      })
    );

     const carCount = await Promise.all(
      cities.map((city) => {
        return {city: Car.countDocuments({city: city})}
      })
    );
    res.status(200).json({
        "hotels": hotelCount,
        "tours": tourCount,
        "cars": carCount
    });
  } catch (err) {
    next(err);
  }
}

module.exports = countByCity;