import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadProfile } from "../profile/profileSlice";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, getAccessTokenSilently, user, isLoading } =
    useAuth0();
  const profile = useAppSelector((state) => state.profile.profile);
  const status = useAppSelector((state) => state.profile.status);

  useEffect(() => {
    user &&
      dispatch(
        loadProfile({
          username: user["https://fourseveneightmedia.com/username"],
        })
      );
  }, [dispatch, user]);

  const authBarLinks = (
    <ul className="navbar-links">
      <li className="navbar-link">
        <button className="btn-aux btn-aux-primary" type="button">
          <Link to="/create/post">Post</Link>
        </button>
      </li>
      <li className="navbar-link">
        <button className="btn-aux btn-aux-primary" type="button">
          <Link to="/create/question">Ask Question</Link>
        </button>
      </li>
      <li className="navbar-link">
        <button className="btn-aux btn-aux-primary" type="button">
          <Link to="/bookmarks/:username">Bookmarks</Link>
        </button>
      </li>
      <li className="navbar-link">
        <button className="btn-aux btn-aux-primary">
          <Link to="/profile/:username"></Link>
        </button>
      </li>
    </ul>
  );

  const guestBarLinks = (
    <ul>
      <li></li>
    </ul>
  );

  if (status === "pending" || isLoading) return <div>Loading</div>;
  return <Fragment></Fragment>;
};

export default Navbar;
