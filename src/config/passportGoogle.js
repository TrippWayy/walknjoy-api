var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
            clientID: "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",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, cb) {
            User.findOrCreate({googleId: profile.id}, function (err, user) {
                return cb(err, user);
            });
        }
    ));
}