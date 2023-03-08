const {
  loginDb,
  habitDefaultDb,
  habitDailyDb,
  systemDb,
} = require("../model/dbmodel");

const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  console.log("Sign in controller", req.body);
  const dbSignInCheck = await loginDb.findOne({ username: req.body.username });
  if (!dbSignInCheck) {
    try {
      let newDate = new Date().toLocaleDateString();
      console.log(newDate);
      const dbSignIn = await loginDb.create(req.body);
      await habitDefaultDb.create({
        username: req.body.username,
        habit: [],
        date: newDate,
        
      });
      await habitDailyDb.create({
        username: req.body.username,
        dailyHabit: [],
        score: 0,
        date: newDate,
        good: 0,
        bad: 0,
        
      });
      await systemDb.create({
        username: req.body.username,
        date: newDate,
        systemAvgRate: 0,
        habitAvgRate: 0,
        system: [],
        count:0
      });
      res.status(201).json({ msg: "success" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "failed", error: "Password less than 6 Char" });
    }
  } else {
    res.status(500).json({ msg: "failed", error: "Username already exist" });
  }
};

const logIn = async (req, res) => {
  console.log("Log in controller", req.body);
  const dbLogInCheck = await loginDb.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (dbLogInCheck) {
    const { _id, username } = dbLogInCheck;
    const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ msg: "success", token: token });
  } else {
    res.status(400).json({ msg: "failed", error: "Incorrect Credentials" });
  }
};

module.exports = { logIn, signIn };
