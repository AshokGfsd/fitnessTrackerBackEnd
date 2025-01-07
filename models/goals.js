const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  goalName: {
    type: String,
    required: true,
  },
  goalDescription: {
    type: String,
    required: true,
  },
  targetDate: {
    type: String,
    default: null,
  },
  targetCaloriesValue: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("Goal", goalSchema, "goal");
