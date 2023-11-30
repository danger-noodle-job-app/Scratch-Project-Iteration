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

const darkSchema = new Schema({
  darkMode: { type: Boolean, required: true },
});

const DBDarkmode = mongoose.model('DBDarkmode', darkSchema);

module.exports = { DBDarkmode };
