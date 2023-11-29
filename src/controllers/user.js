const User = require("../model/User");
const Hotel = require("../model/Hotel");
const Car = require("../model/Car");
const Tour = require("../model/Tour");
const Entertainment = require("../model/Entertainment");
const createError = require("../utils/error");
const send = require("../utils/sendEmail");

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            const updatedUser = await User.findByIdAndUpdate(
                {_id: req.user._id},
                {$set: req.body},
                {new: true}
            );
            res.status(200).json(updatedUser);
        } else {
            next(createError(400, "This username was exists already!"));
        }
    } catch (e) {
        next(e)
    }
}

const updateProfilePhoto = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            {_id: req.user._id},
            {$set: {img: req.body.img}},
            {new: true}
        );
        res.status(200).json(updatedUser);
    } catch (e) {
        next(e)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete({_id: req.user._id});
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
}
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const getFavorites = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json(user.favoriteProducts)
    } catch (e) {
        next(e)
    }
}

const addFavorite = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const productID = req.params.id;

        const productTypes = [Hotel, Car, Tour, Entertainment];

        let foundProduct = null;

        for (const ProductType of productTypes) {
            foundProduct = await ProductType.findById(productID);
            if (foundProduct) {
                break;
            }
        }

        if (!foundProduct) {
            return res.status(404).json({error: 'Product not found'});
        }
        const productIndex = user.favoriteProducts.findIndex((product) => product instanceof foundProduct.constructor);

        if (productIndex === -1) {
            user.favoriteProducts.push(foundProduct);
        } else {
            user.favoriteProducts.splice(productIndex, 1);
        }

        await user.save();
        res.status(200).json({success: "Favorites updated"});
    } catch (e) {
        next(e);
    }
};


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}
const sendOffer = async (req, res, next) => {
    const employeeInfo = req.body;
    try {
        const options = {
            email: "mansimovnijat@gmail.com",
            subject: 'Collaborate Offer',
            message: `${employeeInfo.companyName} 
                      ${employeeInfo.fullName}
                      ${employeeInfo.job}
                      ${employeeInfo.businessEmail}
                      ${employeeInfo.businessPhone}
                      ${employeeInfo.message}`,
        };
        await send.sendMail(options);
        res.status(200).json({success: 'Collaborate offer has been sent to Walknjoy!'});
    } catch (e) {
        next(e)
    }
}

module.exports = {updateUser, deleteUser, getUsers, getFavorites, addFavorite, getUser, updateProfilePhoto, sendOffer}