const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const taskSchema = new Schema(
  {
    taskName: {
      type: [String],
      required: true,
    },
    dateStarted: {
      type: String,
      required: true,
    },
    endingDate: {
      type: String,
      required: true,
    },
    user: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Task", taskSchema);
