import React, { Fragment } from "react";
import AuthenticationButton from "../auth/authentication-button";

const AuthNav: React.FC = () => {
  return (
    <Fragment>
      <div>
        <AuthenticationButton />
      </div>
    </Fragment>
  );
};

export default AuthNav;
