const Entertainment = require("../model/Entertainment");
const Hotel = require("../model/Hotel");
const {generateUniqueIdentifier} = require("../middlewares/uniqueKeyMiddleware");
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
    try {
        const entertainment = await Entertainment.findById(req.params.entertainmentID);
        const userIdentifier = req.cookies['uniqueViewer'];

        if (!userIdentifier) {
            const newIdentifier = generateUniqueIdentifier();
            if (!entertainment.viewedUsers.includes(newIdentifier)) {
                res.cookie('uniqueViewer', newIdentifier, {maxAge: 31536000000});
                entertainment.viewedUsers.push(newIdentifier);
                await entertainment.save();
            }
        }

        res.json(entertainment);
    } catch (error) {
        next(error);
    }
}

const getEntertainments = async (req, res, next) => {
    try {
        const {min, max, ...others} = req.query;

        const query = {};

        if (min || max) {
            query.price = {};
            if (min) query.price.$gt = parseInt(min);
            if (max) query.price.$lt = parseInt(max);
        }

        const entertainments = await Entertainment.find({...others, ...query}).limit(req.query.limit || 0);

        res.status(200).json(entertainments);
    } catch (err) {
        next(err);
    }
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
    try {
        const reviewData = {
            username: req.user.username,
            image: req.user.img,
            review: req.body.review,
        };
        const entertainment = await Entertainment.findById(req.params.entertainmentID)
        entertainment.reviews.push({reviewData})
        await entertainment.save()
        res.status(200).json({success: "Review has been added successfuly!"})
    } catch (e) {
        next(e)
    }
}

const getReviews = async (req, res, next) => {
    try {
        const entertainment = await Entertainment.findById(req.params.entertainmentID)
        res.status(200).json({reviews: entertainment.reviews, count: entertainment.reviews.length})
    } catch (e) {
        next(e)
    }
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