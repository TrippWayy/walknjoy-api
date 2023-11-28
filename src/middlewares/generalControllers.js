const {generateUniqueKey} = require("../utils/generateUniqueKey")
const TourCompany = require("../model/TourCompany");
const Blog = require("../model/Blog");
const UserInteraction = require("../model/UserInteraction")
const Hotel = require("../model/Hotel");

exports.getItem = async (Model, req, res, next) => {
  try {
    const item = await Model.findById(req.params.id);
    const userIdentifier = req.cookies['uniqueViewer'];

    if (!userIdentifier) {
      const newIdentifier = generateUniqueKey();
      if (!item.viewedUsers.includes(newIdentifier)) {
        res.cookie('uniqueViewer', newIdentifier, { maxAge: 31536000000 });
        item.viewedUsers.push(newIdentifier);

        // Save the item with the updated viewedUsers array
        await item.save();

        // Update the UserInteraction model using the simulated data
        const userInteraction = await UserInteraction.findOne({ userID: req.user._id });

        if (!userInteraction) {
          // Create a new UserInteraction document if it doesn't exist
          const newUserInteraction = new UserInteraction({
            userID: req.user,_id,
            products: [],
          });

          newUserInteraction.products.push({
            productType: item.productType,
            productID: [item._id],
          });

          await newUserInteraction.save();
        } else {
          // Check if the productType is already in the userInteraction document
          const existingProductType = userInteraction.products.find(product => product.productType === item.productType);

          if (existingProductType) {
            // If the productType exists, add the new productID to the existing productType
            existingProductType.productID.push(item._id);
          } else {
            // If the productType doesn't exist, create a new productType entry
            userInteraction.products.push({
              productType: item.productType,
              productID: [item._id],
            });
          }

          await userInteraction.save();
        }
      }
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};


exports.getItems = async (Model, req, res, next) => {
    if (Model === Blog || Model === TourCompany) {
        try {
            const items = await Model.find({})
            res.status(200).json(items)
        } catch (err) {
            next(err)
        }
    } else {
        try {
            if (Object.keys(req.query).length === 0) {
                const items = await Model.find({});
                res.status(200).json(items);
            } else {
                const {min, max, ...others} = req.query;

                // Use parseInt to convert min and max to numbers
                const minPrice = parseInt(min) || 1;
                const maxPrice = parseInt(max) || 999;

                const items = await Model.find({
                    ...others,
                    price: {$gt: minPrice, $lt: maxPrice},
                }).limit(req.query.limit);

                res.status(200).json(items);
            }
        } catch (err) {
            next(err);
        }
    }
}

exports.generalAddReview = async (Model, req, res, next) => {
    try {
        const reviewData = {
            username: req.user.username,
            image: req.user.img,
            review: req.body.review,
        };
        const item = await Model.findById(req.params.id)
        item.reviews.push({reviewData})
        await item.save()
        res.status(200).json({success: "Review has been added successfuly!"})
    } catch (e) {
        next(e)
    }
}

exports.generalGetReviews = async (Model, req, res, next) => {
    try {
        const item = await Model.findById(req.params.id)
        res.status(200).json({reviews: item.reviews, count: item.reviews.length})
    } catch (e) {
        next(e)
    }
}