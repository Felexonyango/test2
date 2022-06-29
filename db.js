const mongoose = require("mongoose");
const config = require("./confing")
const connectDB = async () => {
  try {
    await mongoose.connect(config.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
    });

    console.log("MongoDB Connected....");
  } catch (error) {
    console.error(error.message);
  
    process.exit(1);
  }
};

module.exports = connectDB;