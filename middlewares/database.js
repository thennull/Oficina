const mongoose = require("mongoose");

var connectDB = async function () {
  let conn = await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  if (conn) console.log(`Mongo database connected: ${process.env.MONGO} - OK`);
};

module.exports = connectDB;
