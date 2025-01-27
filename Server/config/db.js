const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect=() => {
    mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
  