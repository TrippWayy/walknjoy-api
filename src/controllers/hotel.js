const Hotel = require("../model/Hotel");
const Room = require("../model/Room");
const Blog = require("../model/Blog");
const {generateUniqueIdentifier} = require("../middlewares/uniqueKeyMiddleware");

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

const getHotel = async (req, res, next) => {
try {
    const hotel = await Hotel.findById(req.params.hotelID);
    const userIdentifier = req.cookies['uniqueViewer'];

    if (!userIdentifier) {
      const newIdentifier = generateUniqueIdentifier();
      if (!hotel.viewedUsers.includes(newIdentifier)) {
        res.cookie('uniqueViewer', newIdentifier, { maxAge: 31536000000 });
        hotel.viewedUsers.push(newIdentifier);
        await hotel.save();
      }
    }

    res.json(hotel);
  } catch (error) {
    next(error);
  }
};

const getHotels = async (req, res, next) => {
  try {
    const { min, max, ...others } = req.query;

    const query = {};

    if (min || max) {
      query.price = {};
      if (min) query.price.$gt = parseInt(min);
      if (max) query.price.$lt = parseInt(max);
    }

    const hotels = await Hotel.find({ ...others, ...query }).limit(req.query.limit || 0);

    res.status(200).json(hotels);
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
    const hotel = await Hotel.findById(req.params.hotelID)
    hotel.reviews.push({reviewData})
    await hotel.save()
    res.status(200).json({success: "Review has been added successfuly!"})
  }catch (e) {
    next(e)
  }
}

const getReviews = async (req, res, next)=>{
    try{
        const hotel = await Hotel.findById(req.params.hotelID)
        res.status(200).json({reviews: hotel.reviews, count: hotel.reviews.length})
    }catch (e) {
        next(e)
    }
}

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getHotels,
    getHotel,
    getHotelRooms,
    countByType,
    countByCity,
    updateHotel,
    deleteHotel,
    createHotel,
    addReview,
    getReviews
}