import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useAppSelector } from "../../app/hooks";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const darkModeEnabled = useAppSelector((state) => state.preferences.darkMode);

  const handleLoginButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithRedirect();
  };

  return (
    <Fragment>
      <div>
        <button
          type="button"
          className={`btn-aux btn-aux-action ${
            darkModeEnabled || "btn-aux-action__darkmode"
          }`}
          onClick={handleLoginButtonClick}
        >
          Login
        </button>
      </div>
    </Fragment>
  );
};

export default LoginButton;
