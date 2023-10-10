const uuid = require('uuid');
exports.generateUniqueIdentifier = ()=> {
  // Generate a random unique identifier, such as a UUID (Universally Unique Identifier)

  // Generate and return a new UUID
  return uuid.v4();
}
