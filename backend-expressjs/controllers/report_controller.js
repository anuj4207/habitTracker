const { habitDefaultDb, habitDailyDb, systemDb } = require("../model/dbmodel");

const trackAllHabit = async (req, res) => {
  console.log("Inside track all habit");
  let { id: username } = req.params;
  username = username.split(":").join("");
  try {
    let findDb = await habitDailyDb.find({ username: username });
    console.log(findDb.length);
    const data = [["day", "score", "good", "bad"]];
    findDb.map((val, key) => {
      return data.push([val.date, val.score, val.good, val.bad]);
    });
    console.log(data);
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    res.status(404).json({ msg: "failed", error: `Not found ${error}` });
  }
};

const trackAllSystem = async (req, res) => {
  console.log("Inside track all system");
  let { id: username } = req.params;
  username = username.split(":").join("");
  try {
    let findDb = await systemDb.find({ username: username });
    console.log(findDb.length);
    const data = [["day", "habit", "system"]];
    findDb.map((val, key) => {
      return data.push([val.date, val.habitAvgRate, val.systemAvgRate]);
    });
    console.log(data);
    if (findDb.length > 0) {
      res.status(200).json({ msg: "success", data: data });
    } else {
      res.status(200).json({ msg: "success", data: "need at least 1 day" });
    }
  } catch (error) {
    res.status(404).json({ msg: "failed", error: `Not found ${error}` });
  }
};

const trackAHabit = async (req, res) => {
  console.log("Inside track a habit");
  let { id: username } = req.params;
  username = username.split(":").join("");
  const findDb = await habitDailyDb.find({ username: username });
  console.log(findDb);
  let query = req.query.habit;
  let newData = [["day", "rate"]];
  for (let i = 0; i < findDb.length; i++) {
    let dd = findDb[i].dailyHabit;
    let date = findDb[i].date;
    let nn = dd.filter((dataa) => {
      return dataa.habit === query;
    });

    if (nn.length == 0) {
      newData.push(["-/-/-", 0]);
    } else {
      nn.map((val, key) => {
        return newData.push([date, val.rate]);
      });
    }
  }
  try {
    res.status(200).json({ msg: "success", data: newData });
  } catch (error) {
    res.status(500).json({ msg: "failed", error: `Not found ${error}` });
  }
};

const trackASystem = async (req, res) => {
  console.log("Inside track a system");
  let { id: username } = req.params;
  username = username.split(":").join("");
  let findDb = await systemDb.find({
    username: username,
    date: req.query.date,
  });
  console.log(findDb, req.query.date);
  try {
    if (findDb.length != 0 || findDb !== null) {
      res.status(200).json({ msg: "success", data: findDb });
    } else {
      res.status(200).json({ msg: "failed", data: "No Data Found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "failed", error: `${error}` });
  }
};

module.exports = { trackAllHabit, trackAllSystem, trackAHabit, trackASystem };
