const RentalCar = require("../model/RentalCar");
const Car = require("../model/Car")
const {getItem, getItems, generalAddReview, generalGetReviews} = require("../middlewares/generalControllers");

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
            {$set: req.body},
            {new: true}
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
    getItem(RentalCar, req, res, next)
};

const getRentals = async (req, res, next) => {
    getItems(RentalCar, req, res, next)
};


const addReview = async (req, res, next) => {
    generalAddReview(RentalCar, req, res, next)
}

const getReviews = async (req, res, next) => {
    generalGetReviews(RentalCar, req, res, next)
}

const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return RentalCar.countDocuments({city: city});
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