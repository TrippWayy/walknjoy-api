const User = require("../model/User");
const Token = require('../model/Token');
const createError = require("../utils/error");
const bcrypt = require("bcrypt");

async function handleTokenVerification(req, res, next, options) {
  const userID = req.params.userID;
  const tokenID = req.params.tokenID;

  try {
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const token = await Token.findOne({
      userId: user._id,
      tokenId: tokenID
    });

    if (!token) {
      return next(createError(400, "Invalid token!"));
    }

    await User.findByIdAndUpdate({ _id: user._id }, options.update, { new: true });
    const removedToken = await Token.findByIdAndDelete({ _id: token._id });
    res.status(200).render(options.page);
  } catch (e) {
    next(e);
  }
}

exports.verifyEmail = async (req, res, next) => {
  await handleTokenVerification(req, res, next, {
    update: { emailVerified: true },
    page: "emailVerifiedPage"
  });
}

exports.verifySub = async (req, res, next) => {
  await handleTokenVerification(req, res, next, {
    update: { isSubscriber: true },
    page: "subscribeVerifiedPage"
  });
}

exports.verifyReset = async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const token = await Token.findOne({
      userId: user._id,
      tokenId: req.params.tokenID
    });

    if (!token) {
      return next(createError(400, "Invalid token!"));
    } else {
      const removedToken = await Token.findByIdAndDelete({ _id: token._id });
      req.session.userID = userID;
      res.status(200).redirect("http://localhost:3001/reset-password");
    }
  } catch (e) {
    next(e);
  }
}
