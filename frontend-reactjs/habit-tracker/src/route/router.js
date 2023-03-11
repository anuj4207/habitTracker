import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Habit from "../components/habit/Habit";
import System from "../components/system/System";
import Report from "../components/report/Report";
const ReactRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route exact path="/home">
          <Home></Home>
        </Route>
        <Route exact path="/habit">
          <Habit></Habit>
        </Route>
        <Route exact path="/system">
          <System></System>
        </Route>
        <Route exact path="/report">
          <Report></Report>
        </Route>
        <Route path="*">
          <Login></Login>
        </Route>
      </Switch>
    </Router>
  );
};
export default ReactRouter;
