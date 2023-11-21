const Entertainment = require("../model/Entertainment");
const {getItem, getItems, generalAddReview, generalGetReviews} = require("../middlewares/generalControllers");
const createEntertainment = async (req, res, next) => {
    const newEntertainment = new Entertainment(req.body);

    try {
        const savedEntertainment = await newEntertainment.save();
        res.status(200).json(savedEntertainment);
    } catch (err) {
        next(err);
    }
};

const updateEntertainment = async (req, res, next) => {
    try {
        const updatedEntertainment = await Entertainment.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedEntertainment);
    } catch (err) {
        next(err);
    }
}

const deleteEntertainment = async (req, res, next) => {
    try {
        await Entertainment.findByIdAndDelete(req.params.id);
        res.status(200).json("Entertainment has been deleted.");
    } catch (err) {
        next(err);
    }
}

const getEntertainment = async (req, res, next) => {
    getItem(Entertainment, req, res, next)
}

const getEntertainments = async (req, res, next) => {
    getItems(Entertainment, req, res, next)
}

const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Entertainment.countDocuments({city: city});
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

const addReview = async (req, res, next) => {
    generalAddReview(Entertainment, req, res, next)
}

const getReviews = async (req, res, next) => {
    generalGetReviews(Entertainment, req, res, next)
}

module.exports = {
    createEntertainment,
    updateEntertainment,
    deleteEntertainment,
    getEntertainment,
    getEntertainments,
    countByCity,
    addReview,
    getReviews
}