import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

const Auth0ProviderWithHistory: React.FC = ({ children }) => {
  const history = useHistory();
  const { user } = useAuth0();
  const domain = `${process.env.REACT_APP_AUTH0_DOMAIN}`;
  const clientId = `${process.env.REACT_APP_AUTH0_CLIENT_ID}`;
  const audience = `${process.env.REACT_APP_AUTH0_AUDIENCE}`;

  console.log({ domain, clientId, audience });

  const onRedirectCallback = async (appState: any) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Fragment>
      <Auth0Provider
        domain={"fourseveneightmedia-test.us.auth0.com"}
        clientId={"YZuhzOkXFhAcgLAcN5pSrGeNklrgnSX8"}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        audience={"https://fourseveneightmedia-test-api"}
      >
        {children}
      </Auth0Provider>
    </Fragment>
  );
};

export default Auth0ProviderWithHistory;
