const User = require("../model/User")
const passport = require("passport")
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy

module.exports = function (passport) {
    passport.use(new LocalStrategy(
      async function(username, password, done) {
        try {
          const user = await User.findOne({ username: username });
          if (!user) {
            return done(null, false, { message: 'Username not found!' });
          }
          const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
                );
          if (!isPasswordCorrect) {
            return done(null, false, { message: 'Wrong username or password!' });
          }
          if (!user.emailVerified){
              return done(null, false, { message: 'Email not verified!' });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
    });


}