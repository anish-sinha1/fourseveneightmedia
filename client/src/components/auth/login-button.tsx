import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLoginButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithRedirect();
  };
  return (
    <Fragment>
      <div>
        <button type="button" onClick={handleLoginButtonClick}>
          Login
        </button>
      </div>
    </Fragment>
  );
};

export default LoginButton;
