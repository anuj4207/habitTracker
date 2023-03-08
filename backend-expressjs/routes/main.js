const express = require("express");
const router = express.Router();
const { logIn, signIn } = require("../controllers/login_controller");
const authenticationMiddleware = require("../middleware/auth");
const {
  addDefaultHabits,
  addDailyHabits,
  deleteDefaultHabits,
  getDefaultHabits,
  fetchADailyHabits,
  fetchAllDailyHabits,
} = require("../controllers/habit_controller");
const {
  addSystem,
  fetchAllSystem,
  fetchSystem,
} = require("../controllers/system_controller");
const {
  trackAllHabit,
  trackAllSystem,
  trackAHabit,
  trackASystem,
} = require("../controllers/report_controller");
router.route("/login").post(logIn);
router.route("/signin").post(signIn);
router.route("/dailyHabit/:id").post(authenticationMiddleware, addDailyHabits);
router
  .route("/dailyHabit/:id")
  .get(authenticationMiddleware, fetchADailyHabits);
router
  .route("/allDailyHabit/:id")
  .get(authenticationMiddleware, fetchAllDailyHabits);
router
  .route("/defaultHabit/:id")
  .post(authenticationMiddleware, addDefaultHabits)
  .get(authenticationMiddleware, getDefaultHabits);
router
  .route("/system/:id")
  .post(authenticationMiddleware, addSystem)
  .get(authenticationMiddleware, fetchSystem);
router.route("/allSystem/:id").get(authenticationMiddleware, fetchAllSystem);
router.route("/reportHabit/:id").get(authenticationMiddleware, trackAllHabit);
router.route("/reportSystem/:id").get(authenticationMiddleware, trackAllSystem);
router.route("/reportAHabit/:id").get(authenticationMiddleware, trackAHabit);
router.route("/reportASystem/:id").get(authenticationMiddleware, trackASystem);
module.exports = router;
