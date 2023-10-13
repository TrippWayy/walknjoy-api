const Tour = require("../model/Tour");
const Hotel = require("../model/Hotel");
const Car = require("../model/Car");

const countByCity = async (req, res, next) => {
  try {
    const regionsOfAzerbaijan = [
  "Baku",
  "Ganja",
  "Sumgait",
  "Mingachevir",
  "Lankaran",
  "Shirvan",
  "Sheki",
  "Nakhchivan",
  "Goychay",
  "Quba",
  "Shamakhi",
  "Sabirabad",
  "Khachmaz",
  "Goygol",
  "Agdam",
  "Agdash",
  "Agjabadi",
  "Astara",
  "Balakan",
  "Beylagan",
  "Bilasuvar",
  "Dashkasan",
  "Fizuli",
  "Gadabay",
  "Goranboy",
  "Goygol",
  "Hajigabul",
  "Imishli",
  "Ismailli",
  "Jalilabad",
  "Kurdamir",
  "Lankaran",
  "Lerik",
  "Masally",
  "Neftchala",
  "Oghuz",
  "Ordubad",
  "Qabala",
  "Qakh",
  "Qazakh",
  "Quba",
  "Qubadli",
  "Shamakhi",
  "Shaki",
  "Shamkir",
  "Shusha",
  "Siazan",
  "Tartar",
  "Tovuz",
  "Ujar",
  "Yardymli",
  "Zaqatala",
  "Zardab"
];

    const countPromises = regionsOfAzerbaijan.map(async (city) => ({
      city,
      hotels: Hotel.countDocuments({ city }).lean().exec(), // Execute the query
      tours: Tour.countDocuments({ city }).lean().exec(), // Execute the query
      cars: Car.countDocuments({ city }).lean().exec(), // Execute the query
    }));

    const counts = await Promise.all(countPromises);

    // Wait for all the query executions to complete
    await Promise.all(counts.map(async (countObject) => {
      countObject.hotels = await countObject.hotels;
      countObject.tours = await countObject.tours;
      countObject.cars = await countObject.cars;
    }));

    res.status(200).json({ counts });
  } catch (err) {
    next(err);
  }
};

module.exports = countByCity;
