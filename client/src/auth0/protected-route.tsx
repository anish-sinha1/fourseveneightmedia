import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/ui/loading";

const ProtectedRoute: React.FC<{ component: React.FC; args: string[] }> = ({
  component,
  ...args
}) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);

export default ProtectedRoute;
