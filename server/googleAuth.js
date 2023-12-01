const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const { User } = require('./models/jobModel');
require('dotenv').config();

const clientSecret = process.env.clientSecret;
const clientID = process.env.clientID;
let user;

// Passport configuration
passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: 'http://localhost:8081/auth/google/callback', 
    // passReqToCallback: true,
  },
  (accessToken, refreshToken, profile, done) => {
    // Save or retrieve user from your database
    user = {
      googleId: profile.id,
      email: profile.email,
      name: profile.displayName,
      picture: profile.picture
    };

    console.log('profile id: ' + profile.id);
    console.log('profile pic: ' + profile.picture);

    // THIS IS GIVING ERROR AFTER PRESSING LOGIN TWICE
    // User.findOne({ googleId: profile.id }, (err, existingUser) => {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (existingUser) {
    //     return done(null, existingUser);
    //   }
    
    //   // User.create()....
    //   const newUser = new User({
    //     googleId: profile.id,
    //     email: profile.email,
    //     name: profile.displayName,
    //   });
    
    //   newUser.save((saveErr) => {
    //     if (saveErr) {
    //       return done(saveErr);
    //     }
    //     return done(null, newUser);
    //   });
    // });
    
    return done(null, profile.id);
}));

// Serialize and deserialize user to/from session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

const getUser = () => {
  return user.googleId;
};

module.exports = { getUser };