require("dotenv").config();
const mongoose = require("mongoose");

const connectionUrl = process.env.MONGO_URI;

// Only return documents that match the query criteria exactly.
mongoose.set("strictQuery", true);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToMongo = async () => {
  try {
    await mongoose.connect(connectionUrl, options);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(`Error while connecting to MongoDB: `, error.message);
  }
};
module.exports = connectToMongo;
