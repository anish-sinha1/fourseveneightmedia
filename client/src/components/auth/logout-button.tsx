import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout({ returnTo: window.location.origin });
  };
  return (
    <Fragment>
      <div>
        <button
          type="button"
          className="btn-aux btn-aux-action__nooutline"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
    </Fragment>
  );
};

export default LogoutButton;
