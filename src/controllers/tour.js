const Tour = require("../model/Tour");
const TourCompany = require("../model/TourCompany");
const {getItem, getItems, generalAddReview, generalGetReviews} = require("../middlewares/generalControllers");

const createTour = async (req, res, next) => {
    const companyID = req.params.companyID;
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save();
        try {
            await TourCompany.findByIdAndUpdate(companyID, {
                $push: {tours: savedTour._id}
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedTour);
    } catch (err) {
        next(err);
    }
}

const updateTour = async (req, res, next) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedTour);
    } catch (err) {
        next(err);
    }
}

const updateTourAvailability = async (req, res, next) => {
    try {
        await Tour.updateOne(
            {"tourNumbers._id": req.params.id},
            {
                $push: {
                    "placeNumber.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Tour status has been updated.");
    } catch (err) {
        next(err);
    }
}

const deleteTour = async (req, res, next) => {
    const companyId = req.params.companyid;
    try {
        await Tour.findByIdAndDelete(req.params.id);
        try {
            await TourCompany.findByIdAndUpdate(companyId, {
                $pull: {tours: req.params.id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Tour has been deleted.");
    } catch (err) {
        next(err);
    }
};

const getTour = async (req, res, next) => {
    getItem(Tour, req, res, next)
};

const getTours = async (req, res, next) => {
    getItems(Tour, req, res, next)
};
const addReview = async (req, res, next) => {
    generalAddReview(Tour, req, res, next)
}
const getReviews = async (req, res, next) => {
    generalGetReviews(Tour, req, res, next)
}
const countByCategory = async (req, res, next) => {
    try {
        const interntalCount = await Tour.countDocuments({category: "internal"})
        const externalCount = await Tour.countDocuments({category: "external"})

        res.status(200).json([
            {category: "internal", count: interntalCount},
            {category: "external", count: externalCount}
        ])
    } catch (err) {
        next(err)
    }
}
const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Tour.countDocuments({city: city});
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

const getToursByCompanyName = async (req, res, next) => {
    try {
        const companyID = req.params.companyID
        const company = await TourCompany.findById(companyID);
        const tours = await Tour.find({companyName: company.name})
        res.status(200).json(tours)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createTour,
    updateTour,
    deleteTour,
    getTour,
    getTours,
    countByCategory,
    updateTourAvailability,
    countByCity,
    getToursByCompanyName,
    getReviews,
    addReview
}