const { systemDb } = require("../model/dbmodel");
const { use } = require("../routes/main");

//set system
const addSystem = async (req, res) => {
  console.log("Inside add system", req.body, req.params);
  let { id: username } = req.params;
  username = username.split(":").join("");
  let currentDate = req.query.date;
  console.log(currentDate);
  const system = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    systemRate: req.body.systemRate,
    habitRate: req.body.habitRate,
    comment: req.body.comment,
  };
  const findDb = await systemDb.find({ username: username, date: currentDate });
  if (findDb !== null) {
    console.log(findDb);
    try {
      let avgSystemRate = findDb[0].systemAvgRate;
      let avgHabitRate = findDb[0].habitAvgRate;
      let avgCount = findDb[0].count;
      console.log(avgCount, avgHabitRate, avgSystemRate);
      avgSystemRate = (system.systemRate + avgCount * avgSystemRate) / 2;
      avgHabitRate = (system.habitRate + avgCount * avgHabitRate) / 2;
      avgCount = avgCount + 1;
      let addDb = await systemDb.findOneAndUpdate(
        {
          username: username,
          date: currentDate,
        },
        {
          $push: { system: system },
          count: avgCount,
          systemAvgRate: avgSystemRate,
          HabitAvgRate: avgHabitRate,
        }
      );
      console.log("addedDb", addDb);
      res.status(201).json({ msg: "success" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "failed", error: `internal server error ${error}` });
    }
  } else {
    try {
      await systemDb.create({
        username: username,
        date: currentDate,
        systemAvgRate: 0,
        habitAvgRate: 0,
        system: [],
        count: 0,
      });
      await systemDb.findOneAndUpdate(
        { username: username, date: currentDate },
        {
          $push: { system: system },
          count: 1,
          systemAvgRate: system.systemRate,
          habitAvgRate: system.habitRate,
        }
      );
      res.status(201).json({ msg: "success" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "failed", error: `Internal server error ${error}` });
    }
  }
};

//fetch all  system
const fetchAllSystem = async (req, res) => {
  console.log("Inside get all system", req.body, req.params);
  let { id: username } = req.params;
  username = username.split(":").join("");
  let findDb = await systemDb.find({ username: username });
  if (findDb) {
    console.log(findDb);

    res.status(201).json({ msg: "success", data: findDb });
  } else {
    res.status(404).json({ msg: "failed", error: "Not found" });
  }
};

//fetch a system
const fetchSystem = async (req, res) => {
  console.log("Inside get system", req.body, req.params);
  let { id: username } = req.params;
  username = username.split(":").join("");
  let findDb = await systemDb.find({ username: username, date: req.body.date });
  if (findDb.length != 0) {
    console.log(findDb);
    res.status(201).json({ msg: "success", data: findDb });
  } else {
    res.status(404).json({ msg: "failed", error: "Not found" });
  }
};
module.exports = { addSystem, fetchAllSystem, fetchSystem };
