import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <Fragment>
      <div>
        <NavLink
          to="/"
          exact
          className="nav-link"
          activeClassName="router-link-exact-active"
        >
          Home
        </NavLink>
        <NavLink
          to="/profile"
          exact
          className="nav-link"
          activeClassName="router-link-exact-active"
        >
          Profile
        </NavLink>
        <NavLink
          to="/external-api"
          exact
          className="nav-link"
          activeClassName="router-link-exact-active"
        >
          External API
        </NavLink>
      </div>
    </Fragment>
  );
};

export default MainNav;
