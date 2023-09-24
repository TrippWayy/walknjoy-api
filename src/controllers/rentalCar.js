const RentalCar = require("../model/RentalCar");
const Car = require("../model/Car")
const Hotel = require("../model/Hotel");
const Room = require("../model/Room");

const createRental = async (req, res, next) => {
  const newHotel = new RentalCar(req.body);

  try {
    const savedRental = await newHotel.save();
    res.status(200).json(savedRental);
  } catch (err) {
    next(err);
  }
};

const updateRental = async (req, res, next) => {
  try {
    const updatedRental = await RentalCar.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRental);
  } catch (err) {
    next(err);
  }
};

const deleteRental = async (req, res, next) => {
  try {
    await RentalCar.findByIdAndDelete(req.params.id);
    res.status(200).json("Rental has been deleted.");
  } catch (err) {
    next(err);
  }
};

const getRental = async (req, res, next) => {
  try {
    const rental = await RentalCar.findById(req.params.id);
    res.status(200).json(rental);
  } catch (err) {
    next(err);
  }
};

const getRentals = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const rentals = await RentalCar.find({
      ...others,
      raiting: { $gt: min | 1, $lt: max || 5 },
    }).limit(req.query.limit);
    res.status(200).json(rentals);
  } catch (err) {
    next(err);
  }
};

const addReview = async (req, res, next)=>{
  try{
    const reviewData = {
      username: req.user.username,
      image: req.user.img,
      review: req.body.review,
    };
    const rental = await RentalCar.findById(req.params.rentalID)
    rental.reviews.push({reviewData})
    await rental.save()
    res.status(200).json({success: "Review has been added successfuly!"})
  }catch (e) {
    next(e)
  }
}

const getReviews = async (req, res, next)=>{
    try{
        const rental = await RentalCar.findById(req.params.rentalID)
        res.status(200).json({reviews: rental.reviews, count: rental.reviews.length})
    }catch (e) {
        next(e)
    }
}

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return RentalCar.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const getRentalCars = async (req, res, next) => {
  try {
    const rental = await RentalCar.findById(req.params.id);
    const list = await Promise.all(
      rental.cars.map((car) => {
        return Car.findById(car);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

module.exports = {
    createRental,
    updateRental,
    deleteRental,
    getRental,
    getRentals,
    addReview,
    getReviews,
    countByCity,
    getRentalCars
}