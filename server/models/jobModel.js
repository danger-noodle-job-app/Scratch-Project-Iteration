const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  dateApplied: { type: Date, required: true },
  company: { type: String, required: true },
  title: { type: String, required: true },
  salary: String,
  status: { type: String, required: true },
  link: String,
  comments: String,
  googleId: { type: String, required: true }
});

const Job = mongoose.model('job', jobSchema);

const userSchema = new Schema({
  googleId: String,
  email: String,
  picture: String,
  name: String
});

const User = mongoose.model('user', userSchema);

module.exports = { Job, User };
