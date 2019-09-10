import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import Header from "./common/Header";

const App = () => {
  return (
    <div className="container-fluid">
      <Header></Header>
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/about" component={AboutPage}></Route>
        <Route path="/courses" component={CoursesPage}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
};

export default App;
