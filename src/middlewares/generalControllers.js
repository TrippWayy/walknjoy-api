const { generateUniqueIdentifier } = require("./uniqueKeyMiddleware");

exports.getItem = async (Model, req, res, next) => {
  try {
    const item = await Model.findById(req.params.id); // (id will be id of Hotel, Car, Tour and etc.)
    const userIdentifier = req.cookies['uniqueViewer'];

    if (!userIdentifier) {
      const newIdentifier = generateUniqueIdentifier();
      if (!item.viewedUsers.includes(newIdentifier)) {
        res.cookie('uniqueViewer', newIdentifier, { maxAge: 31536000000 });
        item.viewedUsers.push(newIdentifier);
        await item.save();
      }
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};
