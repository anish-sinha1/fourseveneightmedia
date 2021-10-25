import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignupClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithRedirect({ screen_hint: "signup" });
  };
  return (
    <Fragment>
      <div>
        <button type="button" onClick={handleSignupClick}>
          Signup
        </button>
      </div>
    </Fragment>
  );
};

export default SignupButton;
