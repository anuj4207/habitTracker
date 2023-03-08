import React from "react";
import { useState, useEffect } from "react";
import "./report.css";
import { Chart } from "react-google-charts";
import axios from "axios";
import { Redirect } from "react-router-dom";
import config from "../../config.json";
function Report() {
  const [allHabitData, setAllHabitData] = useState([]);
  const [allSystemData, setAllSystemData] = useState([]);
  const [aHabitData, setAHabitData] = useState([]);
  const [aHabit, setAHabit] = useState("");
  const [nav, setNav] = useState("");
  const [sysError, setSysError] = useState(false);
  const [defaultHabit, setDefaultHabit] = useState([]);
  const [toggleHabit, setToggleHabit] = useState(false);
  const [systemDate, setSystemDate] = useState("");
  const [sysData, setSysData] = useState([]);
  const [showSys, setShowSys] = useState(false);
  const headersConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("id_token")}` },
  };
  // const [auth, setAuth] = useState(true);
  const habitOptions = {
    title: "",
    vAxis: { title: "Net Score" },
    hAxis: { title: "Date" },
    seriesType: "bars",
    series: { 3: { type: "line" } },
    colors: ["#9E85C6", "#58a9e5", "#e92a2a"],
    backgroundColor: "#D9D9D9",
  };
  const aHabitOptions = {
    title: "",
    vAxis: { title: "Net Score" },
    hAxis: { title: "Date" },
    seriesType: "bars",
    series: { 1: { type: "line" } },
    colors: ["#9E85C6"],
    backgroundColor: "#D9D9D9",
  };
  const systemOptions = {
    title: "",
    vAxis: { title: "Avg Rate" },
    hAxis: { title: "Date" },
    seriesType: "bars",
    series: { 2: { type: "line" } },
    colors: ["#9E85C6", "#58a9e5"],
    backgroundColor: "#D9D9D9",
  };
  const getAllHabitReport = async () => {
    await axios
      .get(
        `${config.TEST_URL}/api/v1/reportHabit/:${localStorage.getItem(
          "username"
        )}`,
        headersConfig
      )
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data === "need at least 1 day") {
          setSysError(true);
        } else {
          setAllHabitData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllSystemReport = async () => {
    await axios
      .get(
        `${config.TEST_URL}/api/v1/reportSystem/:${localStorage.getItem(
          "username"
        )}`,
        headersConfig
      )
      .then((res) => {
        console.log(res.data.data);
        setAllSystemData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAHabitReport = async () => {
    await axios
      .get(
        `${config.TEST_URL}/api/v1/reportAHabit/:${localStorage.getItem(
          "username"
        )}/?habit=${aHabit}`,
        headersConfig
      )
      .then((res) => {
        console.log(res.data.data);
        setAHabitData(res.data.data);
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
        setDefaultHabit(res.data.data.habit);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getSystemReport = async () => {
    let newDate =
      systemDate[systemDate.length - 2] +
      systemDate[systemDate.length - 1] +
      "/" +
      systemDate[systemDate.length - 5] +
      systemDate[systemDate.length - 4] +
      "/" +
      systemDate[systemDate.length - 10] +
      systemDate[systemDate.length - 9] +
      systemDate[systemDate.length - 8] +
      systemDate[systemDate.length - 7];

    await axios
      .get(
        `${config.TEST_URL}/api/v1/reportASystem/:${localStorage.getItem(
          "username"
        )}/?date=${newDate}`
      )
      .then((res) => {
        console.log(res.data.data[0]);
        setSysData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowSys(true);
  };
  useEffect(() => {
    getDefaultHabit();
    getAllHabitReport();
    getAllSystemReport();
    // let authStat = localStorage.getItem("authenticated");
    // setAuth(authStat);
  }, []);
  useEffect(() => {
    console.log("use effect 2 called");
    getAHabitReport();
  }, [aHabit]);
  if (nav === "habit") {
    return <Redirect to="/habit"></Redirect>;
  } else if (nav === "system") {
    return <Redirect t="/system"></Redirect>;
  } else if (nav === "logout") {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    return <Redirect to="/"></Redirect>;
  } else if (localStorage.getItem("authenticated")) {
    return (
      <div className="report" h-screen w-screen>
        <div className="md:grid  md:grid-cols-12  h-screen">
          {/* NAVBAR */}
          <div className=" md:h-screen md:col-span-2 bg-themegrey  md:rounded-r-xl ">
            <div className="flex mt-6 md:mt-8 2xl:ml-12  md:text-xl xl:text-2xl text-md ml-20 md:ml-4 lg:ml-8 w-max">
              <h1 className="mt-1 text-themepurple">ATOMIC</h1>
              <h2 className="ml-2 bg-themepurple p-1 rounded-lg shadow-md text-themegrey h-8 xl:h-10">
                HABITS
              </h2>
            </div>
            <div className="grid md:grid-rows-4 grid-cols-3 md:grid-flow-col  2xl:mb-24  mt-4 md:mt-0">
              <div className=" md:ml-12 lg:ml-16 2xl:ml-20  md:w-24 md:mt-8 bg-themepurple hover:opacity-60 p-1 rounded-md shadow-md  h-8 pl-4 mb-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setNav("habit");
                  }}
                >
                  HABITS
                </button>
              </div>
              <div className="md:ml-12  lg:ml-16 2xl:ml-20 ml-2 md:w-24 md:mt-2  bg-themepurple hover:opacity-60 p-1 rounded-md shadow-md  h-8 pl-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setNav("system");
                  }}
                >
                  SYSTEM
                </button>
              </div>
              <div className="md:ml-12 lg:ml-16 2xl:ml-20 ml-2 md:w-24 md:-translate-y-4  bg-themepurple hover:opacity-60 p-1 rounded-md shadow-md  h-8 pl-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setNav("logout");
                  }}
                >
                  LOG OUT
                </button>
              </div>
            </div>
            <div className="con">
              <div className="font-thin ml-1 -translate-y-28 text-black">
                “The ultimate form of intrinsic motivation is when a habit
                becomes part of your identity. It’s one thing to say I’m the
                type of person who wants this. It’s something very different to
                say I’m the type of person who is this.”
              </div>
            </div>
            <div className="con -translate-y-28">
              <div className="shadow-md w-28 md:ml-12 lg:ml-16 md:mt-4 xl:mt-12 2xl:ml-20 shadow-themegreen text-themepurple">
                CONTACT US
              </div>
            </div>
          </div>
          {/** CONTENT  */}
          <div className=" md:col-span-8 md:pl-6 h-screen">
            <div className="flex ml-28 md:ml-80 text-black text-2xl mt-10">
              TRACKER
            </div>
            <div className="grid grid-rows-3 h-screen">
              <div className="grid grid-cols-2">
                <div className="bg-white h-48 shadow-md rounded-md hover:bg-green-50 overflow-y-auto pt-2 md:ml-24 mt-4   ml-4">
                  <button
                    className=" text-white text-xl mb-4 bg-themegreen shadow-md rounded-md p-1 hover:opacity-60 md:ml-28 ml-10"
                    onClick={(e) => {
                      setToggleHabit(false);
                    }}
                  >
                    All Report
                  </button>
                  <div className="grid grid-cols-2 mt-2 justify-items-center md:p-0 p-2 pl-2">
                    {defaultHabit.map((habit) => {
                      // if (habit.rate > 1) {
                      //   console.log("err", habit.rate);
                      // }
                      if (habit.rate === 1) {
                        return (
                          <button
                            key={habit._id}
                            className=" text-black mb-4 bg-blue-300 shadow-md rounded-md p-1 hover:opacity-70"
                            onClick={(e) => {
                              setAHabit(habit.habit);
                              setToggleHabit(true);
                            }}
                          >
                            {habit.habit}
                          </button>
                        );
                      } else if (habit.rate === 0) {
                        return (
                          <button
                            key={habit._id}
                            className=" text-black mb-4 bg-purple-300 shadow-md rounded-md p-1 hover:opacity-70"
                            onClick={(e) => {
                              setAHabit(habit.habit);
                              setToggleHabit(true);
                            }}
                          >
                            {habit.habit}
                          </button>
                        );
                      } else if (habit.rate === -1) {
                        return (
                          <button
                            key={habit._id}
                            className=" text-black mb-4 bg-red-300 shadow-md rounded-md p-1 hover:opacity-70"
                            onClick={(e) => {
                              setAHabit(habit.habit);
                              setToggleHabit(true);
                            }}
                          >
                            {habit.habit}
                          </button>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                  </div>
                </div>
                <div className="bg-white h-48 shadow-md rounded-md hover:bg-green-50 overflow-y-auto pt-2 md:ml-24 mt-4 text-black  ml-4">
                  <div className="flex">
                    <form>
                      <input
                        type="date"
                        value={systemDate}
                        onChange={(e) => {
                          setSystemDate(e.target.value);
                        }}
                        className="bg-purple-200 pl-1 ml-6 mt-2 text-xs"
                      ></input>
                    </form>
                    <button
                      className="ml-2 mt-1 bg-red-200 pl-1 pr-1 rounded-lg shadow-lg hover:opacity-70"
                      onClick={getSystemReport}
                    >
                      System
                    </button>
                  </div>
                  <div className="">
                    {showSys ? (
                      <table className="text-md ml-4 p-2 mt-4 overflow-auto">
                        <tr>
                          <th className="p-2">Time</th>

                          <th className="p-2">System</th>
                          <th className="p-2">Habit</th>
                          <th className="p-2">Comment</th>
                        </tr>
                        {sysData.system.map((val, key) => {
                          return (
                            <tr key="sysData._id">
                              <td>
                                {val.startTime}-{val.endTime}
                              </td>
                              <td>{val.systemRate}</td>
                              <td>{val.habitRate}</td>
                              <td>{val.comment}</td>
                            </tr>
                          );
                        })}
                      </table>
                    ) : (
                      <h1 className="mt-10 ml-10">No Data ...</h1>
                    )}
                  </div>
                </div>
              </div>

              <div className="  mt-4 md:ml-24">
                {toggleHabit ? (
                  <div className="shadow-2xl">
                    <Chart
                      chartType="ComboChart"
                      width="100%"
                      height="200px"
                      data={aHabitData}
                      options={aHabitOptions}
                    />
                  </div>
                ) : (
                  <div className="shadow-2xl">
                    <Chart
                      chartType="ComboChart"
                      width="100%"
                      height="200px"
                      data={allHabitData}
                      options={habitOptions}
                    />
                  </div>
                )}

                <h1 className="text-white ml-4  w-32 ">HABIT REPORT</h1>
              </div>
              <div className="  mt-4 md:ml-24">
                {!sysError ? (
                  <div className="">
                    <Chart
                      chartType="ComboChart"
                      width="100%"
                      height="100px"
                      data={allSystemData}
                      options={systemOptions}
                    />
                    <h1 className="text-white ml-4   w-36">SYSTEM REPORT</h1>
                  </div>
                ) : (
                  <h1 className="text-2xl border-2 p-4">
                    Start Updating system daily to check ...
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <Redirect to="/"></Redirect>;
  }
}

export default Report;
