//require("dotenv").config();
const Mongoose = require("mongoose");

module.exports = {
  connect: () => {
    Mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      //useCreateIndex: true,
      useUnifiedTopology: true,
      //useFindAndModify: false,
    });
    const connection = Mongoose.connection;
    connection.once("open", () => {
      console.log(" Connected to the database successfully");
    });
    connection.on("error", (error) => {
      console.log(`Unable to connect to the database due to ${error}`);
    });
  },
};
