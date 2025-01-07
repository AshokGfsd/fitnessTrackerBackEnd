const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  weight: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  height: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  BMI: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  calories: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      totalCaloriesBurned: {
        type: Number,
        required: true,
      },
      totalCaloriesConsumed: {
        type: Number,
        required: true,
      },
      totalCaloriesGoal: {
        type: Number,
        required: true,
      },
      remainingCaloriestoGoal: {
        type: Number,
        required: true,
      },
    },
  ],
  suggestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suggestion",
    },
  ],
  otp: {
    type: Number,
    default: "",
  },
});

module.exports = mongoose.model("Users", userSchema, "users");
