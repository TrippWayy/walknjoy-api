const Car = require("../model/Car");
const RentalCar = require("../model/RentalCar");

const createCar = async (req, res, next)=>{
      const rentalID = req.params.rentalID;
      const newCar = new Car(req.body);
      try {
        const savedCar = await newCar.save();
        try{
            await RentalCar.findByIdAndUpdate(rentalID, {
                $push: {tours: savedCar._id}
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
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

const getCars = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const cars = await Car.find({
      ...others,
      pricePerDay: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};


module.exports = {
    createCar,
    updateCar,
    deleteCar,
    getCar,
    getCars,
    updateCarAvailability,
}