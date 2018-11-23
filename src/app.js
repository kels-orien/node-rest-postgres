import React from "react";
import { Route, Switch } from "react-router";
import withSession from "./hoc/withSession";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

const App = ({ refetch, session }) => (
  <Switch>
    <Route
      path="/signin"
      render={props => <SignIn {...props} refetch={refetch} />}
    />
    <Route
      path="/signup"
      render={props => <SignUp {...props} refetch={refetch} />}
    />
    <Route
      path="/"
      render={props => <Dashboard {...props} refetch={refetch} />}
    />
  </Switch>
);

const AppComponent = withSession(App);

export default AppComponent;
