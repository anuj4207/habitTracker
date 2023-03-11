import React from "react";
import { useState, useEffect } from "react";
import "./home.css";
import { Redirect } from "react-router-dom";
export default function Home() {
  const [page, setPage] = useState("");
  //const [auth, setAuth] = useState(true);
  const handleClick = (e) => {
    e.preventDefault();
    setPage(e.target.value);
  };
  useEffect(() => {
    // let authStat = localStorage.getItem("authenticated");
    // setAuth(authStat);
  }, []);
  if (page === "habit") {
    return <Redirect to="/habit"></Redirect>;
  }
  if (page === "system") {
    return <Redirect to="/system"></Redirect>;
  }
  if (page === "report") {
    return <Redirect to="/report"></Redirect>;
  }
  if (localStorage.getItem("authenticated")) {
    return (
      <div className="home h-screen w-screen">
        <div className="flex flex-row justify-center md:text-3xl text-xl mr-6">
          <h1 className="mr-3 mt-6 md:mr-6">WELCOME</h1>
          <h1 className="bg-themegreen rounded-xl shadow-md mt-4 p-2">
            USERNAME
          </h1>
        </div>
        <div className="grid md:grid-cols-3 grid-rows-3 md:grid-flow-row grid-flow-col justify-items-center text-center h-128 md:mt-0 mt-10 ">
          <div className="transition duration-1000  border-2 md:w-52 md:h-48 w-36 h-36 bg-themegrey text-themepurple rounded-xl md:translate-y-48   md:hover:translate-y-24">
            <button
              onClick={handleClick}
              value="habit"
              className=" duration 700 text-2xl md:mt-16 mt-10 shadow-md p-2 shadow-themegreen rounded-md hover:bg-themepurple hover:text-themegrey "
            >
              HABITS
            </button>
          </div>
          <div className="transition duration-700 border-2 md:w-52 md:h-48 w-36 h-36 bg-themegrey text-themepurple rounded-xl md:translate-y-48   md:hover:translate-y-72">
            <button
              className="text-2xl  md:mt-16 mt-10 shadow-md p-2 shadow-themegreen rounded-md hover:bg-themepurple hover:text-themegrey"
              onClick={handleClick}
              value="system"
            >
              SYSTEM
            </button>
          </div>
          <div className="transition duration-700 border-2 md:w-52 md:h-48 w-36 h-36 bg-themegrey text-themepurple rounded-xl md:translate-y-48   md:hover:translate-y-24">
            <button
              className="text-2xl md:mt-16 mt-10 shadow-md p-2 shadow-themegreen rounded-md hover:bg-themepurple hover:text-themegrey"
              onClick={handleClick}
              value="report"
            >
              REPORT
            </button>
          </div>
          <div className="con bg-themegreen rounded-md pl-4 pr-4 h-48  mt-6 ">
            <h1 className="md:mt-24 mt-4">Start building your habits</h1>
            <h1>&</h1>
            <h1>Keep track daily.</h1>
          </div>
          <div className="con bg-themegreen rounded-md pl-4 pr-4 h-48  mt-6 ">
            <h1 className="mt-4">Start making your system</h1>
            <h1>&</h1>
            <h1>Keep track daily.</h1>
          </div>
          <div className="con bg-themegreen rounded-md pl-4 pr-4 w-52 h-48 mt-6">
            <h1 className="md:mt-24 mt-4">Track your progress</h1>
            <h1>&</h1>
            <h1>Keep improving.</h1>
          </div>
        </div>
        <div className="text-center md:text-3xl text-xl font-thin tracking-wide 2xl:mt-24 ">
          1% BETTER EVERY DAY
        </div>
      </div>
    );
  } else {
    return <Redirect to="/"></Redirect>;
  }
}
