import "./index.css";
import habitloop from "../../assets/flow.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import config from "../../config.json";
function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    await axios
      .post(`${config.TEST_URL}/api/v1/login`, {
        username: credentials.username,
        password: credentials.password,
      })
      .then((res) => {
        setCredentials({ username: "", password: "" });
        setError(false);
        localStorage.setItem("username", credentials.username);
        localStorage.setItem("authenticated", true);
        localStorage.setItem("id_token", res.data.token);
        setAuthenticated(true);
        console.log(
          localStorage.getItem("authenticated"),
          localStorage.getItem("username"),
          localStorage.getItem("id_token")
        );
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "Incorrect Credentials") {
          setError(true);
          setErrorMsg("Incorrect Credentials");
          setAuthenticated(false);
        }
        setCredentials({ username: "", password: "" });
      });
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    console.log(credentials);
    await axios
      .post(`${config.TEST_URL}/api/v1/signin`, {
        username: credentials.username,
        password: credentials.password,
      })
      .then((res) => {
        console.log("res", res);
        setCredentials({ username: "", password: "" });
      })
      .catch((err) => {
        setCredentials({ username: "", password: "" });
        console.log("err");
        setError(true);
        setErrorMsg(err.response.data.error);
      });
  };
  useEffect(() => {
    console.log(authenticated);
  }, [authenticated, error]);
  if (localStorage.getItem("authenticated")) {
    return <Redirect to="/home"></Redirect>;
  } else {
    return (
      <div className="login bg-themepurple">
        <div className="flex justify-center">
          <h1 className="mr-3 mt-12 md:mt-5 text-3xl lg:text-5xl lg:mr-5 md:text-5xl md:mr-4">
            ATOMIC
          </h1>
          <h2 className="mr-3 mt-10 md:mt-3 text-3xl h-12 pt-2 rounded-md text-themepurple bg-themegrey lg:text-5xl lg:mr-5 lg:h-16 md:text-5xl md:mr-4 md:h-14">
            HABITS
          </h2>
        </div>
        <div className="grid md:grid-cols-2 h-128 md:mt-6 mt-20 lg:mt-6 2xl:mt-24">
          <div className="ml-4 md:ml-28  justify-self-center">
            <h1 className="m-2 ml-10 md:text-lg ">INSPIRED BY JAMES CLEAR</h1>
            <div className="w-80 h-96 md:h-96 md:p-0 p-2 bg-themegrey rounded-xl shadow-xl ">
              <div className="p-2 align-middle text-black place-content-center text-md md:text-md text-center">
                <h1>START YOUR JOURNEY TO BUILD EFFICEINT SYSTEM AND</h1>
                <h1>GOOD HABITS</h1>
              </div>

              <form className="ml-14 pt-6 md:pt-12 grid grid-row gap-y-3 text-black">
                <input
                  type="text"
                  name="username"
                  placeholder="USERNAME"
                  value={credentials.username}
                  className="w-3/4 bg-red-300 pl-16 rounded-lg shadow-md"
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                ></input>
                <input
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  className="w-3/4 pl-14 bg-red-300 rounded-lg shadow-md"
                ></input>
                <div className="flex mt-2">
                  <button
                    className=" w-1/4 ml-6 bg-themepurple rounded-md shadow-xl"
                    onClick={handleLoginSubmit}
                  >
                    LOGIN
                  </button>
                  <button
                    className=" w-1/4 ml-6 bg-themegreen rounded-md shadow-xl"
                    onClick={handleSigninSubmit}
                  >
                    SIGNUP
                  </button>
                </div>
                {error && (
                  <div className="text-xs text-red-600 ">{errorMsg}</div>
                )}
              </form>
              <div>
                <h1 className="text-themepurple md:mt-6 mt-10 text-center">
                  Goals are good for setting a direction, but systems are best
                  for making progress
                </h1>
              </div>
            </div>
          </div>
          <div className="con justify-self-center w-128 xl:mr-24 md:mr-12 ">
            <h1 className="text-lg ml-4 md:mt-0 md:text-2xl mt-6">
              TINY CHANGES REAMARKABLE RESULT
            </h1>
            <div className="con text-md  ml-4">
              <h1>The purpose of setting goals is to win the game.</h1>
              <h1>The purpose of building systems is to</h1>
              <h1> continue playing the game</h1>
            </div>
            <div className="grid grid-cols-3">
              <img
                src={habitloop}
                alt=""
                className=" w-48 h-48 md:w-48 md:h-48 xl:w-52 xl:h-52 xl:mt-16 md:mt-12 md:ml-12"
              />
              <div className=" grid grid-cols-1 text-lg w-12 ml-12 h-24 mt-6 md:mb-24 md:mt-6 md:ml-12 md:w-48 md:h-24 xl:mt-6 xl:ml-12">
                <h1 className="rotate-90">1%</h1>
                <h1 className="rotate-90">B</h1>
                <h1 className="rotate-90">E</h1>
                <h1 className="rotate-90">T</h1>
                <h1 className="rotate-90">T</h1>
                <h1 className="rotate-90">E</h1>
                <h1 className="rotate-90">R</h1>
                <h1 className="rotate-90">E</h1>
                <h1 className="rotate-90">V</h1>
                <h1 className="rotate-90">E</h1>
                <h1 className="rotate-90">R</h1>
                <h1 className="rotate-90">Y</h1>
                <h1 className="rotate-90">D</h1>
                <h1 className="rotate-90">A</h1>
                <h1 className="rotate-90">Y</h1>
              </div>
              <div className="grid grid-rows-2 gap-y-16">
                <h1>
                  Success is the product of daily habits—not once-in-a-lifetime
                  transformations
                </h1>
                <h1>
                  Some people spend their entire lives waiting for the time to
                  be right to make an improvement
                </h1>
              </div>
            </div>
            <h1 className="text-md ml-4 md:text-2xl md:mt-16 xl:mt-20 mt-12 ">
              Break your bad habits and stick to good ones.
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
