const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv').config();

const clientSecret = process.env.clientSecret;
const clientID = process.env.clientID;

const jobController = require('./controllers/jobController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../build')));

/***********************Google Oauth******************************/
// app.use(require('express-session')({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport configuration
// passport.use(new GoogleStrategy({
//   clientID,
//   clientSecret,
//   callbackURL: 'http://localhost:3000/auth/google/callback', // You need to set up this callback URL in your Google Developer Console
// },
// (accessToken, refreshToken, profile, done) => {
//   // Save or retrieve user from your database
//   // In this example, we're just saving the user ID in the session
//   return done(null, profile.id);
// }));

// // Serialize and deserialize user to/from session
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// // Middleware to check if the user is authenticated
// const ensureAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/auth/google'); // Redirect to Google authentication if not authenticated
// };

// // Google authentication routes
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => res.redirect('/'));
/***********************End of Google Oauth***********************/

//Sync data to redux store
app.get('/data', jobController.syncData, (req, res) => {
  return res.status(200).json(res.locals.syncData);
});

//Creating job in database
app.post('/', jobController.createJob, (req, res) => {
  return res.status(200).redirect('/');
});

//Updating job in database
app.patch('/:id', jobController.updateStatus, (req, res) => {
  return res.status(200).redirect('/');
});

app.patch('/edit/:id', jobController.editPost, (req, res) => {
  return res.status(200).redirect('/');
});

//Deleting job in database
app.delete('/:id', jobController.deleteStatus, (req, res) => {
  return res.status(200).redirect('/');
});

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
);

app.use((req, res) => res.status(404).send('Page Not Found'));

//Global error Handle
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
