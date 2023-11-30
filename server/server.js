const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./googleAuth');

const mySecret = process.env.mySecret;

const jobController = require('./controllers/jobController');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../build')));

/***********************Google Oauth******************************/
app.use(
  session({
    secret: mySecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google authentication routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/successLogin',
    failureRedirect: '/failLogin',
  })
);

app.get('/successLogin', (req, res) => {
  // return res.status(200).send('Login Successful!');
  return res.status(200).redirect('/');
});

app.get('/failLogin', (req, res) => {
  return res.status(200).send('Failed to login');
});

// IMPLEMENT SIGN OUT BUTTON OR MANUALLY GO TO THIS URL
app.get('/logout', (req, res) => {
  // req.logout();
  req.session.destroy();
  return res.status(200).redirect('/');
  // return res.status(200).send('Successfully logged out');
});
/***********************End of Google Oauth***********************/

//Sync data to redux store
app;

//Check the DB for darkmode bool, tur or false
app.get('/data/darkmode', jobController.getGoogleId, jobController.darkModeCheck, (req, res) => {
  return res.status(200).json(res.locals.darkMode);
});

return res.status(200).json(res.locals.syncData);
//;

//Creating job in database
app.post('/', jobController.getGoogleId, jobController.createJob, (req, res) => {
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
  // let userName = req.user.displayName();
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
);

app.use((req, res) => res.status(404).send('Page Not Found'));

//Global error Handle
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred', err },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
