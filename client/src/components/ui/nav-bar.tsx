import React, { Fragment } from "react";

import MainNav from "./main-nav";
import AuthNav from "./auth-nav";

const NavBar: React.FC = () => {
  return (
    <Fragment>
      <div className="nav-container mb-3">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="container">
            <div className="navbar-brand logo" />
            <MainNav />
            <AuthNav />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default NavBar;
