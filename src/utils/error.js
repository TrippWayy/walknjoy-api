const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.error = message;
  return err;
};

module.exports = createError;