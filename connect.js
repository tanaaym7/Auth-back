const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

async function connectToMongoDB(mongoURI) {
  return mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
    });
}

module.exports = {
  connectToMongoDB,
};
