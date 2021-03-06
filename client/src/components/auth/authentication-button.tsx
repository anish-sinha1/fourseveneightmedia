import React, { Fragment } from "react";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Fragment>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</Fragment>
  );
};

export default AuthenticationButton;
