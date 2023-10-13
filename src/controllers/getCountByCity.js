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

    const hotelCount = await Promise.all(
      regionsOfAzerbaijan.map(async (city) => {
        const count = await Hotel.countDocuments({ city: city }).lean();
        return { city, count };
      })
    );

    const tourCount = await Promise.all(
      regionsOfAzerbaijan.map(async (city) => {
        const count = await Tour.countDocuments({ city: city }).lean();
        return { city, count };
      })
    );

    const carCount = await Promise.all(
      regionsOfAzerbaijan.map(async (city) => {
        const count = await Car.countDocuments({ city: city }).lean();
        return { city, count };
      })
    );

    res.status(200).json({
      hotels: hotelCount,
      tours: tourCount,
      cars: carCount
    });
  } catch (err) {
    next(err);
  }
};

module.exports = countByCity;
