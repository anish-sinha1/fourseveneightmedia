import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../auth0/protected-route";

const Routes: React.FC = () => {
  return (
    <Fragment>
      <section className="app-container">
        <Switch></Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
