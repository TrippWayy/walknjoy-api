const User = require("../model/User")
const bcrypt = require("bcrypt")
const createError = require("../utils/error")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator");
const Token = require("../model/Token")
const crypto = require("crypto")
const send = require('../utils/sendEmail')
const passport = require("passport")

require("../config/passportLocal")(passport)
require("../config/passportGoogle")(passport)

const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        const user = await User.findOne({email: req.body.email});
        if (user && user.emailVerified) {
            next(createError(400, 'This email was exists!'));
        } else if (user && !user.emailVerified) {
            const removeToken = await Token.findByIdAndDelete({userId: user._id});
            const removeUser = await User.findByIdAndDelete({_id: user._id});
        }
        const newUser = new User({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        const token = new Token({
            userId: newUser._id,
            tokenId: crypto.randomBytes(34).toString('hex'),
        });
        await token.save();
        const url = `${process.env.BASE_URL}/api/verify/${newUser._id}/${token.tokenId}`;
        const options = {
            email: newUser.email,
            subject: 'Verify Email',
            message: url,
        };
        await send.sendMail(options);
        res.status(200).json({success: 'User has been created!'});
    } catch (err) {
        next(err);
    }
};

const google = async (req, res, next) => {
    passport.authenticate('google', {scope: ['profile']})
}

const googleCallback = async (req, res, next) => {
    passport.authenticate('google', {failureRedirect: '/login'}),
        function (req, res) {
            // Successful authentication, redirect home.
            res.status(200).send("User has been authenticated!");
        }
}

const login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: "An error occurred during authentication."});
        }
        if (!user) {
            return res.status(401).json(info); // Pass along the error message from LocalStrategy
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return res.status(500).json({error: "An error occurred during login."});
            }

            return res.status(200).json({success: "User has been logged in successfully!", img: user.img});
        });
    })(req, res, next);
};


const logout = async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({success: "User has been logged out!"})
    });
}

const forgetPassword = async (req, res, next) => {
    const email = req.body.email
    try {
        const user = await User.findOne({email: email})
        if (!user || !user.emailVerified) {
            return next(createError(404, "User or email not found!"))
        } else {
            const token = new Token({userId: user._id, tokenId: crypto.randomBytes(34).toString("hex")})
            await token.save()
            const url = `${process.env.BASE_URL}/api/verify/reset-password/${user._id}/${token.tokenId}`
            const options = {
                email: user.email,
                subject: 'Reset password',
                message: url,
            };
            await send.sendMail(options);
            res.status(200).json({success: "To reset password, link has been sent your email! "})
        }
    } catch (e) {
        next(e)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        if (req.body.password === req.body.confirmPassword) {
            const hash = await bcrypt.hashSync(req.body.password, 10);
            const user = await User.findByIdAndUpdate({_id: req.session.userID}, {password: hash}, {new: true})
            res.status(200).json({success: "User password has been updated!"})
        } else {
            res.status(400).json({error: "Password and confirm password are not the same!"})
        }
    } catch (e) {
        next(e)
    }
}

const resetProfilePassword = async (req, res, next) => {
    try {
        if (req.body.password === req.body.confirmPassword) {
            const hash = await bcrypt.hashSync(req.body.password, 10);
            const user = await User.findByIdAndUpdate({_id: req.user._id}, {password: hash}, {new: true})
            res.status(200).json({success: "User password has been updated!"})
        } else {
            res.status(400).json({error: "Password and confirm password are not the same!"})
        }
    } catch (e) {
        next(e)
    }
}

const employeeLogin = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({error: "An error occurred during authentication."});
        }
        if (!user) {
            return res.status(401).json(info); // Pass along the error message from LocalStrategy
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({error: "An error occurred during login."});
            }

            return res.status(200).json({success: "Employee has been logged in successfully!"});
        });
    })(req, res, next);
}

const subscribe = async (req, res, next) => {
    const email = req.body.email
    try {
        const user = await User.findOne({email: email})
        if (req.user.email == email && user.emailVerified && !user.isSubscriber) {
            const token = new Token({
                userId: user._id,
                tokenId: crypto.randomBytes(34).toString('hex'),
            });
            await token.save();
            const url = `${process.env.BASE_URL}/api/verify/sub/${user._id}/${token.tokenId}`;
            const options = {
                email: user.email,
                subject: 'Subscribe Email',
                message: url,
            };
            await send.sendMail(options)
            res.status(200).json({success: "To subscribe, verify link has been sent successfult to your mail!"})
        } else {
            return next(createError(400, "Please enter your mail that's you logged in with that"))
        }
    } catch (e) {
        next(e)
    }
}

module.exports = {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword,
    resetProfilePassword,
    employeeLogin,
    subscribe
}
