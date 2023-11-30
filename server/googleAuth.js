const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const { User } = require('./models/jobModel');
require('dotenv').config();

const clientSecret = process.env.clientSecret;
const clientID = process.env.clientID;

// Passport configuration
passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback', 
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    // Save or retrieve user from your database
    const user = {
      googleId: profile.id,
      email: profile.email,
      name: profile.displayName,
      picture: profile.picture
    }

    User.findOne({ googleId: profile.id }, (err, existingUser) => {
      if (err) {
        return done(err);
      }
      if (existingUser) {
        return done(null, existingUser);
      }
    
      // 
      const newUser = new User({
        googleId: profile.id,
        email: profile.email,
        name: profile.displayName,
      });
    
      newUser.save((saveErr) => {
        if (saveErr) {
          return done(saveErr);
        }
        return done(null, newUser);
      });
    });
    // In this example, we're just saving the user ID in the session
    return done(null, profile.id);
}));

// Serialize and deserialize user to/from session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));


// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));