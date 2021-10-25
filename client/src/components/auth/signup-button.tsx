import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useAppSelector } from "../../app/hooks";

const SignupButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignupClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithRedirect({ screen_hint: "signup" });
  };
  const darkModeEnabled = useAppSelector((state) => state.preferences.darkMode);
  return (
    <Fragment>
      <div>
        <button
          type="button"
          className={`btn-aux btn-aux-action ${
            darkModeEnabled || "btn-aux-action__darkmode"
          }`}
          onClick={handleSignupClick}
        >
          Signup
        </button>
      </div>
    </Fragment>
  );
};

export default SignupButton;
