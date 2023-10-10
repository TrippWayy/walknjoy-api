const Car = require("../model/Car");
const RentalCar = require("../model/RentalCar");

const createCar = async (req, res, next)=>{
      const rentalID = req.params.rentalID;
      const newCar = new Car(req.body);
      try {
        const savedCar = await newCar.save();
        try{
            await RentalCar.findByIdAndUpdate(rentalID, {
                $push: {cars: savedCar._id}
            })
        }catch (err) {
            next(err)
        }
        res.status(200).json(savedCar);
      } catch (err) {
        next(err);
      }
}

const updateCar = async (req, res, next)=>{
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (err) {
    next(err);
  }
}

const updateCarAvailability = async (req, res, next)=>{
      try {
        await Car.updateOne(
          { _id: req.params.id },
          {
            $set: {
              "availability": req.body.availability
            },
          },
            {new: true}
        );
        res.status(200).json("Car status has been updated.");
      } catch (err) {
        next(err);
      }
}

const deleteCar = async (req, res, next)=>{
  const rentalID = req.params.rentalID;
  try {
    await Car.findByIdAndDelete(req.params.id);
    try {
      await RentalCar.findByIdAndUpdate(rentalID, {
        $pull: { cars: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Car has been deleted.");
  } catch (err) {
    next(err);
  }
};

const getCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car.viewedUsers.includes(req.user._id)) {
          car.viewedUsers.push(req.user._id);
          await car.save();
        }
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

const getCars = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const cars = await Car.find({});
      res.status(200).json(cars);
    } else {
      const { min, max, ...others } = req.query;

      // Use parseInt to convert min and max to numbers
      const minPrice = parseInt(min) || 1;
      const maxPrice = parseInt(max) || 999;

      const cars = await Car.find({
        ...others,
        pricePerDay: { $gt: minPrice, $lt: maxPrice },
      }).limit(req.query.limit);

      res.status(200).json(cars);
    }
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
    const car = await Car.findById(req.params.carID)
    car.reviews.push({reviewData})
    await car.save()
    res.status(200).json({success: "Review has been added successfuly!"})
  }catch (e) {
    next(e)
  }
}

const getReviews = async (req, res, next)=>{
    try{
        const car = await Car.findById(req.params.carID)
        res.status(200).json({reviews: car.reviews, count: car.reviews.length})
    }catch (e) {
        next(e)
    }
}


module.exports = {
    createCar,
    updateCar,
    deleteCar,
    getCar,
    getCars,
    updateCarAvailability,
    getReviews,
    addReview
}