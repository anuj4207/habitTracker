import React from "react";
import "./habit.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import config from "../../config.json";

function Habit() {
  const [habitName, setHabitName] = useState("");
  const [dailyHabit, setDailyHabit] = useState({});
  const [myDefaultHabit, setmyDefaultHabit] = useState([]);
  const [myDailyHabit, setmyDailyHabit] = useState([]);
  const [nav, setNav] = useState("");
  const headersConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("id_token")}` },
  };
  //const [auth, setAuth] = useState(true);
  const handleAdd = (e) => {
    e.preventDefault();
    if (e.target.value === "good") {
      submitDefaultHabit(1);
    } else if (e.target.value === "neutral") {
      submitDefaultHabit(0);
    } else {
      submitDefaultHabit(-1);
    }
  };
  const submitDefaultHabit = async (rates) => {
    await axios
      .post(
        `${config.TEST_URL}/api/v1/defaultHabit/:${localStorage.getItem(
          "username"
        )}`,
        {
          habit: habitName,
          rate: rates,
        },
        headersConfig
      )
      .then((res) => {
        setHabitName("");
        getDefaultHabit();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDefaultHabit = async () => {
    await axios
      .get(
        `${config.TEST_URL}/api/v1/defaultHabit/:${localStorage.getItem(
          "username"
        )}`,
        headersConfig
      )
      .then((res) => {
        //console.log("data", res.data.data);
        setmyDefaultHabit(res.data.data.habit);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const submitDailyHabit = async () => {
    console.log(dailyHabit);
    let newDate = new Date().toLocaleDateString();
    //let newDate = "04/03/2023";
    await axios
      .post(
        `${config.TEST_URL}/api/v1/dailyHabit/:${localStorage.getItem(
          "username"
        )}/?date=${newDate}`,
        {
          habit: dailyHabit.habit,
          rate: dailyHabit.rate,
          date: newDate,
        },
        headersConfig
      )
      .then((res) => {
        console.log("post daily", res);
        setDailyHabit({});
        getDailyHabit();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDailyHabit = async () => {
    let newDate = new Date().toLocaleDateString();
    console.log(newDate);
    await axios
      .get(
        `${config.TEST_URL}/api/v1/dailyHabit/:${localStorage.getItem(
          "username"
        )}/?date=${newDate}`,
        headersConfig
      )
      .then((res) => {
        console.log("daily habit list", res.data.data[0]);
        setmyDailyHabit(res.data.data[0].dailyHabit);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setHabits = (id) => {
    let findHabit = myDefaultHabit.filter((habit) => {
      if (id === habit._id) {
        return habit;
      } else {
        return null;
      }
    });
    let { habit, rate } = findHabit[0];
    setDailyHabit({ habit: habit, rate: rate });
    console.log(dailyHabit);
  };
  useEffect(() => {
    console.log("useEffect1", localStorage.getItem("authenticated"));
    getDefaultHabit();
    getDailyHabit();
    // let authStat = localStorage.getItem("authenticated");
    // setAuth(authStat);
  }, []);
  useEffect(() => {
    console.log("useEffect2");
  }, [myDefaultHabit, myDailyHabit]);
  if (nav === "system") {
    return <Redirect to="/system"></Redirect>;
  } else if (nav === "logout") {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    return <Redirect to="/"></Redirect>;
  } else if (nav === "report") {
    return <Redirect to="/report"></Redirect>;
  } else if (localStorage.getItem("authenticated")) {
    return (
      <div className="habit h-screen w-screen">
        <div className="md:grid  md:grid-cols-10  h-screen">
          {/* NAVBAR */}
          <div className=" md:h-screen md:col-span-2 bg-themepurple  md:rounded-r-xl ">
            <div className="flex mt-6 md:mt-8 2xl:ml-12  md:text-xl xl:text-2xl text-md ml-20 md:ml-4 lg:ml-8 w-max">
              <h1 className="mt-1">ATOMIC</h1>
              <h2 className="ml-2 bg-themegrey p-1 rounded-lg shadow-md text-themepurple h-8 xl:h-10">
                HABITS
              </h2>
            </div>
            <div className="grid md:grid-rows-4 grid-cols-3 md:grid-flow-col  2xl:mb-24  mt-4 md:mt-0">
              <div className=" md:ml-12 lg:ml-16 2xl:ml-20  md:w-24 md:mt-8 bg-themegrey hover:opacity-60 p-1 rounded-md shadow-md text-themepurple h-8 pl-4 mb-4">
                <button
                  onClick={(e) => {
                    setNav("system");
                  }}
                >
                  SYSTEM
                </button>
              </div>
              <div className="md:ml-12  lg:ml-16 2xl:ml-20 ml-2 md:w-24 md:mt-2  bg-themegrey  hover:opacity-60 p-1 rounded-md shadow-md text-themepurple h-8 pl-4">
                <button
                  onClick={(e) => {
                    setNav("report");
                  }}
                >
                  REPORT
                </button>
              </div>
              <div className="md:ml-12 lg:ml-16 2xl:ml-20 ml-2 md:w-24 md:-translate-y-4  bg-themegrey  hover:opacity-60 p-1 rounded-md shadow-md text-themepurple h-8 pl-3">
                <button
                  onClick={(e) => {
                    setNav("logout");
                  }}
                >
                  LOG OUT
                </button>
              </div>
            </div>
            <div className="con">
              <div className="font-thin ml-1 -translate-y-28">
                “The ultimate form of intrinsic motivation is when a habit
                becomes part of your identity. It’s one thing to say I’m the
                type of person who wants this. It’s something very different to
                say I’m the type of person who is this.”
              </div>
            </div>
            <div className="con -translate-y-28">
              <div className="shadow-md w-28 md:ml-12 lg:ml-16 md:mt-4 xl:mt-12 2xl:ml-20 shadow-themegreen">
                CONTACT US
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className=" md:col-span-8 md:pl-6 h-screen">
            <div className="grid grid-cols-2 justify-items-end">
              <div className="flex x:ml-14 md:ml-6  text-black text-2xl md:mt-10 mt-20">
                HABIT TRACKER
              </div>
              <div className="con border-l-purple-800 rounded-full ">
                <div className="bg-themepurple border-l-purple-800 rounded-full w-40 h-40 -translate-y-10 translate-x-2"></div>
                <div className="grid grid-rows-4  ml-10 -translate-y-40 mt-2">
                  <div className="grid grid-cols-2 -space-x-6">
                    <h1 className="bg-blue-300 rounded-md shadow-md hover:opacity-60 h-6 pl-2 w-6">
                      +
                    </h1>

                    <h1 className="">Good</h1>
                  </div>
                  <div className="grid grid-cols-2 -space-x-6">
                    <h1 className="bg-purple-300 rounded-md shadow-md hover:opacity-60 h-6 pl-2 w-6">
                      N
                    </h1>

                    <h1 className="">Neutral</h1>
                  </div>
                  <div className="grid grid-cols-2 -space-x-6">
                    <h1 className="bg-red-300 rounded-md shadow-md hover:opacity-60 h-6 pl-2 w-6">
                      -
                    </h1>

                    <h1 className="">Bad</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-row-2 -translate-y-56">
              <div className="text-black md:ml-24 mt-10  ">
                <h1 className="ml-6 md:mt-0 mt-16">MY HABITS</h1>
                <div className="bg-white md:w-2/3 h-48 shadow-md rounded-md hover:bg-green-50 overflow-y-auto pt-2">
                  <h1 className=" text-themepurple ml-10 mt-1">
                    Create your Habit List
                  </h1>
                  <div className="flex">
                    <form>
                      <input
                        type="text"
                        value={habitName}
                        label="habit"
                        placeholder="Add Habit"
                        className="bg-gray-100 ml-6 mt-2 w-24 pl-2 rounded-md"
                        onChange={(e) => setHabitName(e.target.value)}
                      ></input>
                    </form>
                    <button
                      value="good"
                      onClick={handleAdd}
                      className="bg-blue-300 ml-6 pl-1 pr-1 rounded-md shadow-md hover:opacity-60 h-6 mt-2"
                    >
                      +
                    </button>
                    <button
                      value="neutral"
                      className="bg-purple-300 ml-6 pl-1 pr-1 rounded-md shadow-md hover:opacity-60 h-6 mt-2"
                      onClick={handleAdd}
                    >
                      N
                    </button>
                    <button
                      value="bad"
                      className="bg-red-300 ml-6 pl-1 pr-1 rounded-md shadow-md hover:opacity-60 h-6 mt-2"
                      onClick={handleAdd}
                    >
                      -
                    </button>
                  </div>

                  <div className="grid grid-cols-4 mt-2 justify-items-center md:p-0 p-2">
                    {myDefaultHabit.map((habit) => {
                      // if (habit.rate > 1) {
                      //   console.log("err", habit.rate);
                      // }
                      if (habit.rate === 1) {
                        return (
                          <h1 key={habit._id} className=" text-blue-500 mb-2">
                            {habit.habit}
                          </h1>
                        );
                      } else if (habit.rate === 0) {
                        return (
                          <h1 key={habit._id} className=" text-purple-500 mb-2">
                            {habit.habit}
                          </h1>
                        );
                      } else if (habit.rate === -1) {
                        return (
                          <h1 key={habit._id} className=" text-red-500 mb-2">
                            {habit.habit}
                          </h1>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="text-black md:ml-24 mt-16  -translate-y-10  pt-2">
                <h1 className="ml-6">TRACK HABITS</h1>
                <div className="bg-white md:w-2/3 h-48 shadow-md rounded-md hover:bg-green-50 overflow-y-auto">
                  <h1 className=" mt-2 text-themepurple ml-10">
                    Add your daily Habit
                  </h1>
                  <div className="flex">
                    <form>
                      <select
                        name="select"
                        id="1"
                        onChange={(e) => {
                          setHabits(e.target.value);
                        }}
                        className="mt-2 ml-6 bg-gray-100 pl-2"
                      >
                        {myDefaultHabit.map((habit) => {
                          if (habit.rate === 1) {
                            return (
                              <option
                                key={habit._id}
                                id={habit._id}
                                className=" text-blue-500 mb-2"
                                value={habit._id}
                              >
                                {habit.habit}
                              </option>
                            );
                          } else if (habit.rate === 0) {
                            return (
                              <option
                                key={habit._id}
                                id={habit._id}
                                className=" text-purple-500 mb-2"
                                value={habit._id}
                              >
                                {habit.habit}
                              </option>
                            );
                          } else {
                            return (
                              <option
                                key={habit._id}
                                id={habit._id}
                                className=" text-red-500 mb-2"
                                value={habit._id}
                              >
                                {habit.habit}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </form>
                    <button
                      className="bg-purple-300 ml-6 pl-1 pr-1 rounded-md shadow-md hover:opacity-60 h-6 mt-2"
                      onClick={submitDailyHabit}
                    >
                      ADD
                    </button>
                  </div>

                  <div className="grid grid-cols-4 mt-2 justify-items-center md:p-0 p-2">
                    {myDailyHabit.map((habit) => {
                      if (
                        habit.rate === 1 &&
                        habit.habit !== "" &&
                        habit.habit !== undefined
                      ) {
                        return (
                          <h1 key={habit._id} className=" text-blue-500 mb-2">
                            {habit.habit}
                          </h1>
                        );
                      } else if (
                        habit.rate === 0 &&
                        habit.habit !== "" &&
                        habit.habit !== undefined
                      ) {
                        return (
                          <h1 key={habit._id} className=" text-purple-500 mb-2">
                            {habit.habit}
                          </h1>
                        );
                      } else if (
                        habit.habit !== "" &&
                        habit.habit !== undefined
                      ) {
                        return (
                          <h1 key={habit._id} className=" text-red-500 mb-2">
                            {habit.habit}
                          </h1>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/"></Redirect>;
  }
}

export default Habit;
