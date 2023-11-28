const mongoose = require('mongoose');

const UserInteractionSchema = new mongoose.Schema({
  userID: String,
  products: [{
      productType: String,
      productID: []
  }],
}, {collection: "UserInteraction", timestamps: true});

const UserInteraction = mongoose.model('UserInteraction', UserInteractionSchema);

module.exports = UserInteraction;
