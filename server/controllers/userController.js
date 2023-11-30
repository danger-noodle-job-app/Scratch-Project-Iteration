// const { User } = require('../models/userModel');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');
// require('dotenv').config();
// const { User } = require('./models/jobModel');

// const clientSecret = process.env.clientSecret;
// const clientID = process.env.clientID;

// const jobController = require('./controllers/jobController');
// const userController = require('./controllers/userController');


// app.use(session({ secret: clientSecret, resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// const userController = {

//   async createUser(req, res, next) {
//     // Passport configuration
//     passport.use(new GoogleStrategy({
//       clientID,
//       clientSecret,
//       callbackURL: 'http://localhost:8081/auth/google/callback', 
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // Save or retrieve user from your database
//       const user = {
//         googleId: profile.id,
//         email: profile.email,
//         name: profile.displayName
//       }

//       const loginUser = await User.findOne({googleId: profile.id});
//       if(loginUser){
//         // user exists
//       } else{
//         //user doesn't exist
//       }
//       // In this example, we're just saving the user ID in the session
//       return done(null, profile.id);
//     }));

//     // Middleware to check if the user is authenticated
//     const ensureAuthenticated = (req, res, next) => {
//       if (req.isAuthenticated()) {
//         res.locals.googleId
//         return next();
//       }
//       res.redirect('/auth/google'); 
//     };
//   },

//   passport.serializeUser((user, done) => done(null, user));
//   passport.deserializeUser((obj, done) => done(null, obj));
// }

// module.exports = userController;