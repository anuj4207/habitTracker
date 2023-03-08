const { habitDefaultDb, habitDailyDb } = require("../model/dbmodel");

//add default habits
const addDefaultHabits = async (req, res) => {
  console.log("Inside add default habits", req.body, req.params);
  let { id: username } = req.params;
  username = username.split(":").join("");
  console.log(username);
  const habit = { habit: req.body.habit, rate: req.body.rate };
  if (habit.habit !== "") {
    try {
      const addDbHabit = await habitDefaultDb.findOneAndUpdate(
        { username: username },
        { $push: { habit: habit } }
      );
      res.status(200).json({ msg: "success" });
    } catch (error) {
      res.status(500).json({ msg: "failed", error: "error" });
    }
  } else {
    res.status(401).json({ msg: "failed", error: "empty" });
  }
};
//fetch default habits
const getDefaultHabits = async (req, res) => {
  console.log("Inside get default habits", req.params);
  let { id: username } = req.params;
  username = username.split(":").join("");
  console.log(username);
  const fetchDb = await habitDefaultDb.findOne({ username: username });
  if (fetchDb) {
    res.status(201).json({ msg: "success", data: fetchDb });
  } else {
    res.status(404).json({ msg: "failed", error: "not found" });
  }
};
//delete default habits by habit name
const deleteDefaultHabits = async (req, res) => {
  console.log("Inside delete default habits");
  const dbCheck = await habitDefaultDb.findOneAndDelete({ habit: req.params });
  res.status(201).json({ msg: "success" });
};
//set daily habits
const addDailyHabits = async (req, res) => {
  console.log("Inside add daily habits");
  let { id: username } = req.params;
  username = username.split(":").join("");
  const habit = { habit: req.body.habit, rate: req.body.rate };
  let currentDate = req.query.date;
  console.log(currentDate);
  //console.log(username, habit);
  if (req.body.habit !== "") {
    const findDb = await habitDailyDb.findOne({
      username: username,
      date: currentDate,
    });
    console.log("findeddb", findDb);
    if (findDb !== null) {
      let score = findDb.score;
      let good = findDb.good;
      let bad = findDb.bad;
      if (habit.rate === 1) {
        good = good + 1;
      } else if (habit.rate === -1) {
        bad = bad + 1;
      }
      score = score + habit.rate;
      //console.log("appenddaily", findDb, score);
      try {
        const addDb = await habitDailyDb.findOneAndUpdate(
          { username: username, date: currentDate },
          { $push: { dailyHabit: habit }, score: score, good: good, bad: bad }
        );
        //console.log("added", addDb);
        res.status(201).json({ msg: "success" });
      } catch (error) {
        res.staus(404).json({ msg: "failed" });
      }
    } else {
      try {
        //console.log("hello");
        await habitDailyDb.create({
          username: username,
          dailyHabit: [],
          score: 0,
          date: currentDate,
          good: 0,
          bad: 0,
        });
        if (habit.rate === 1) {
          good = 1;
        } else if (habit.rate === -1) {
          bad = 1;
        }
        const addDb = await habitDailyDb.findOneAndUpdate(
          { username: username, date: currentDate },
          {
            $push: { dailyHabit: habit },
            score: habit.rate,
            good: good,
            bad: bad,
          }
        );
        //console.log("added", addDb);
        res.status(201).json({ msg: "success" });
      } catch (error) {
        res.staus(404).json({ msg: "failed" });
      }
    }
  } else {
    res.status(401).json({ msg: "failed", error: "empty" });
  }
};
//fetch a daily habits
const fetchADailyHabits = async (req, res) => {
  console.log("Inside get daily habit", req.query);
  let { id: username } = req.params;
  username = username.split(":").join("");
  const findDb = await habitDailyDb.find({
    username: username,
    date: req.query.date,
  });
  if (findDb.length != 0) {
    console.log(findDb);
    res.status(201).json({ msg: "success", data: findDb });
  } else {
    res.status(404).json({ msg: "failed", error: "not found" });
  }
};
//fetch all daily habits
const fetchAllDailyHabits = async (req, res) => {
  console.log("Inside fetch all daily habits");
  let { id: username } = req.params;
  username = username.split(":").join("");
  const findDb = await habitDailyDb.find({
    username: username,
  });
  console.log(findDb);
  if (findDb.length != 0) {
    res.status(201).json({ msg: "success", data: findDb });
  } else {
    res.status(404).json({ msg: "failed", error: "not found" });
  }
};

module.exports = {
  addDefaultHabits,
  addDailyHabits,
  deleteDefaultHabits,
  getDefaultHabits,
  fetchADailyHabits,
  fetchAllDailyHabits,
};
