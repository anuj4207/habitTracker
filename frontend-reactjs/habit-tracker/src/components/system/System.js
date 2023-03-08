import React from "react";
import { useState, useEffect } from "react";
import "./system.css";
import axios from "axios";
import Timekeeper from "react-timekeeper";
import { Redirect } from "react-router-dom";
import config from "../../config.json";
function System() {
  const star = [1, 2, 3, 4, 5];
  const [nav, setNav] = useState("");
  const [comment, setComment] = useState("");
  const [startTime, setStartTime] = useState("10:10");
  const [endTime, setEndTime] = useState("12:10");
  const [timeType, setTimeType] = useState(0);
  const [time, setTime] = useState(false);
  const [sysRating, setSysRating] = useState(0);
  const [sysHover, setSysHover] = useState(0);
  const [habRating, setHabRating] = useState(0);
  const [habHover, setHabHover] = useState(0);
  const headersConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("id_token")}` },
  };

  const handleStartTime = (e) => {
    if (e.target.value === "start") {
      setTime(true);
      setTimeType(1);
    } else if (e.target.value === "end") {
      setTime(true);
      setTimeType(2);
    }
    console.log("handlestartime", time);
  };
  const handleAddSystem = async (e) => {
    //e.preventDefault();
    let newDate = new Date().toLocaleDateString();
    await axios
      .post(
        `${config.TEST_URL}/api/v1/system/:${localStorage.getItem(
          "username"
        )}/?date=${newDate}`,
        {
          startTime: startTime,
          endTime: endTime,
          systemRate: sysRating,
          habitRate: habRating,
          comment: comment,
        },
        headersConfig
      )
      .then((res) => {
        console.log(res);
        setComment("Comment...");
        setHabRating(0);
        setHabHover(0);
        setSysHover(0);
        setSysRating(0);
        setEndTime("12:10");
        setStartTime("10:10");
        setTimeType(0);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("helllo", sysRating, sysHover);
  };

  useEffect(() => {
    console.log("hh", habRating, localStorage.getItem("authenticated"));
  }, [sysRating, habRating]);
  useEffect(() => {
    // let authStat = localStorage.getItem("authenticated");
    // setAuth(authStat);
  }, []);
  if (nav === "habit") {
    return <Redirect to="/habit"></Redirect>;
  } else if (nav === "logout") {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    return <Redirect to="/"></Redirect>;
  } else if (nav === "report") {
    return <Redirect to="/report" />;
  } else if (localStorage.getItem("authenticated")) {
    return (
      <div className="system h-screen  w-screen">
        <div className="md:grid md:grid-cols-10 h-screen">
          {/* NAVBAR */}
          <div className=" md:h-screen md:col-span-2 bg-themepurple  md:rounded-r-xl">
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
                    e.preventDefault();
                    setNav("habit");
                  }}
                >
                  HABITS
                </button>
              </div>
              <div className="md:ml-12  lg:ml-16 2xl:ml-20 ml-2 md:w-24 md:mt-2  bg-themegrey  hover:opacity-60 p-1 rounded-md shadow-md text-themepurple h-8 pl-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setNav("report");
                  }}
                >
                  REPORT
                </button>
              </div>
              <div className="md:ml-12 lg:ml-16 2xl:ml-20 ml-2 md:w-24 md:-translate-y-4  bg-themegrey  hover:opacity-60 p-1 rounded-md shadow-md text-themepurple h-8 pl-3">
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
              <div className="font-thin ml-1 -translate-y-28">
                “When you fall in love with the process rather than the product,
                you don’t have to wait to give yourself permission to be happy.
                You can be satisfied anytime your system is running.” Atomic
                Habits, James Clear
              </div>
            </div>
            <div className="con -translate-y-28">
              <div className="shadow-md w-28 md:ml-12 lg:ml-16 md:mt-4 xl:mt-12 2xl:ml-20 shadow-themegreen">
                CONTACT US
              </div>
            </div>
          </div>
          {/* CONTENT */}
          <div className="md:col-span-8 md:pl-6 h-screen">
            <div className="flex ml-14 md:ml-80 text-black text-2xl mt-10">
              SYSTEM TRACKER
            </div>
            <div className="grid md:grid-cols-4 grid-rows-3 mt-20 mr-16 ml-10 h-3/4">
              {!time && (
                <div className="md:bg-white bg-themepurple shadow-lg rounded-md text-black md:ml-20 md:mr-10  mt-10 grid grid-rows-5 justify-items-center h-64 w-56 md:hover:bg-green-50 hover:shadow-2xl">
                  <h1 className="mt-6">SELECT TIMELINE</h1>
                  <div className="h1  mt-4 ">From</div>
                  <button
                    className="bg-red-300 w-20 h-10 rounded-md shadow-md  hover:bg-purple-300"
                    onClick={handleStartTime}
                    value="start"
                  >
                    {startTime}
                  </button>
                  <div className="h1 ">To</div>
                  <button
                    className="bg-blue-300 w-20 h-10 -translate-y-4 rounded-md shadow-md hover:bg-purple-300"
                    onClick={handleStartTime}
                    value="end"
                  >
                    {endTime}
                  </button>
                </div>
              )}

              {time &&
                (timeType === 1 ? (
                  <div className="md:ml-20">
                    <Timekeeper
                      time={startTime}
                      onDoneClick={() => {
                        setTime(false);
                      }}
                      onChange={(value) => {
                        setStartTime(value.formatted24);
                      }}
                    />
                  </div>
                ) : (
                  <div className="md:ml-20">
                    <Timekeeper
                      time={endTime}
                      onDoneClick={() => {
                        setTime(false);
                      }}
                      onChange={(value) => {
                        setEndTime(value.formatted24);
                      }}
                    />
                  </div>
                ))}

              <div className="md:bg-themepurple bg-themegreen shadow-lg rounded-md text-white grid grid-rows-7 pl-4 md:ml-40 md:mt-0 mt-56 md:col-span-2 w-60 hover:shadow-2xl h-80">
                <h1 className="mt-6 mb-20 ">SYSTEM</h1>
                <form action="">
                  <textarea
                    className="bg-gray-100 text-md -translate-y-10 hover:bg-green-50 text-black"
                    value={comment}
                    placeholder="Comment...."
                    onChange={(e) => {
                      e.preventDefault();
                      setComment(e.target.value);
                    }}
                  ></textarea>
                  <h1 className="  ">Rate System</h1>
                  {star.map((val, index) => {
                    index += 1;
                    return (
                      <button
                        key={index}
                        className={
                          index <= (sysHover || sysRating) ? "on" : "off"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setSysRating(index);
                          setSysHover(sysRating);
                        }}
                        onMouseEnter={() => setSysHover(index)}
                        onMouseLeave={() => setSysHover(sysRating)}
                      >
                        <span>&#9733;</span>
                      </button>
                    );
                  })}
                  <h1 className="  ">Rate Habits</h1>
                  {star.map((val, index) => {
                    index += 1;
                    return (
                      <button
                        key={index}
                        className={
                          index <= (habHover || habRating) ? "on" : "off"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setHabRating(index);
                          setHabHover(habRating);
                        }}
                        onMouseEnter={() => setHabHover(index)}
                        onMouseLeave={() => setHabHover(habRating)}
                      >
                        <span>&#9733;</span>
                      </button>
                    );
                  })}
                  <button
                    className="md:bg-themegreen bg-themegrey md:text:white text-black hover:opacity-60 w-16 rounded-md  shadow-md mb-10 ml-12"
                    onClick={handleAddSystem}
                  >
                    ADD
                  </button>
                </form>
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

export default System;
