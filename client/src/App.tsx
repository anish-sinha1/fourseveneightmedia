import React, { Fragment, useEffect, useState } from "react";
import { Router, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Navbar from "./components/ui/navbar";
import Loading from "./components/ui/loading";
import ProtectedRoute from "./auth0/protected-route";
import { store } from "./app/store";
import { setUser, UserObject } from "./components/user/userSlice";
import { createProfileIfNotExists } from "./components/profile/profileSlice";
import "./App.css";

const App: React.FC = () => {
  const { isLoading, user, getAccessTokenSilently, getIdTokenClaims } =
    useAuth0();

  //set user whenever there is a login/signup event and delete useless properties. on logout or if there is no user, set user to null
  useEffect(() => {
    if (user) {
      try {
        Object.defineProperty(
          user,
          "username",
          Object.getOwnPropertyDescriptor(
            user,
            "https://fourseveneightmedia.com/username"
          ) || ""
        );
      } catch (err) {
        console.log(err);
      }

      delete user["https://fourseveneightmedia.com/username"];
      delete user.nickname;
      delete user.name;
      delete user.picture;
      delete user.updated_at;
      user.user_id = user.sub;
      delete user.sub;
      store.dispatch(setUser(user as UserObject));
      const fetchToken = async () => {
        const accessToken = await getAccessTokenSilently();
        const idToken = await getIdTokenClaims();
        console.log(idToken);
        store.dispatch(
          createProfileIfNotExists({
            user: user as UserObject,
            accessToken: accessToken,
          })
        );
        return;
      };
      fetchToken();
    } else store.dispatch(setUser(null));
  }, [user, getAccessTokenSilently, getIdTokenClaims]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <div>
        <Navbar />
        <button type="button" className="btn btn-primary">
          Primary
        </button>
        <button type="button" className="btn btn-secondary">
          Primary
        </button>
        <button type="button" className="btn btn-danger">
          Primary
        </button>
        <button type="button" className="btn btn-action">
          Primary
        </button>
        <button type="button" className="btn-aux btn-aux-primary">
          Primary
        </button>
        <button type="button" className="btn-aux btn-aux-secondary">
          Primary
        </button>
        <button type="button" className="btn-aux btn-aux-danger">
          Primary
        </button>
        <button type="button" className="btn-aux btn-aux-action">
          Primary
        </button>
      </div>
    </Fragment>
  );
};

export default App;
