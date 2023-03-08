const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide Username"],
  },
  password: {
    type: String,
    required: [true, "Please provide Password"],
    minLength: [6, "Minimum Character 6"],
  },
});

//habits list
const habitsSchema = mongoose.Schema({
  habit: [{ habit: String, rate: Number }],
  username: { type: String },
});
//daily habit list
const habitDailySchema = mongoose.Schema({
  dailyHabit: [{ habit: String, rate: Number }],
  score: { type: Number },
  good: { type: Number },
  bad: { type: Number },
  date: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
  },
});

const systemSchema = mongoose.Schema({
  username: { type: String },
  system: [
    {
      startTime: String,
      endTime: String,
      systemRate: Number,
      habitRate: Number,
      comment: String,
    },
  ],
  systemAvgRate: { type: Number },
  habitAvgRate: { type: Number },
  count: { type: Number },
  date: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const loginDb = mongoose.model("Login", loginSchema);
const habitDefaultDb = mongoose.model("DefaultHabit", habitsSchema);
const systemDb = mongoose.model("System", systemSchema);
const habitDailyDb = mongoose.model("DailyHabit", habitDailySchema);
module.exports = { loginDb, habitDefaultDb, habitDailyDb, systemDb };
