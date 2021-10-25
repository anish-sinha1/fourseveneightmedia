//implements responsive navigation bar component

import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingAnimation from "./skeleton-animations/navbar-loading";

//ui
import Avatar from "@mui/material/Avatar";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HelpIcon from "@mui/icons-material/Help";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import InfoIcon from "@mui/icons-material/Info";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import AuthNav from "./auth-nav";
import SignupButton from "../auth/signup-button";
import { useAppSelector } from "../../app/hooks";

const Navbar: React.FC = () => {
  const { isLoading, user, isAuthenticated, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const darkModeEnabled = useAppSelector((state) => state.preferences.darkMode);

  const open = Boolean(anchorEl);

  const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    logout({ returnTo: window.location.origin });
  };

  const authBarLinks = (
    <ul className="navbar-links">
      <li className="navbar-link">
        <Link to="/create/post">
          <button
            className={`btn-aux btn-aux-action ${
              darkModeEnabled || "btn-aux-action__darkmode"
            }`}
            type="button"
          >
            Post
          </button>
        </Link>
      </li>
      <li className="navbar-link">
        <Link to="/create/question">
          <button
            className={`btn-aux btn-aux-action ${
              darkModeEnabled || "btn-aux-action__darkmode"
            }`}
            type="button"
          >
            Ask Question
          </button>
        </Link>
      </li>
      <li className="navbar-link">
        <Link
          to={`/bookmarks/${
            user && user["https://fourseveneightmedia.com/username"]
          }`}
        >
          <BookmarksOutlinedIcon />
        </Link>
      </li>
      <li className="navbar-link">
        <Avatar
          className="navbar-link__avatar"
          onClick={handleProfileClick}
          alt="profile"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWuzd8cpCv2AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
        />

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar
              alt="profile"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWuzd8cpCv2AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
            />
            View profile
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <Link to="/create/post">Write a new post</Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <Link to="/create/question">Ask a new question</Link>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <Link
              to={`/profile/${
                user && user["https://fourseveneightmedia.com/username"]
              }/stats`}
            >
              Stats
            </Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <Link
              to={`/profile/${
                user && user["https://fourseveneight.com/username"]
              }/settings`}
            >
              Settings
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PrivacyTipIcon />
            </ListItemIcon>
            <Link to="/privacy">
              <em>Privacy</em>
            </Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <Link to="/terms">
              <em>Terms</em>
            </Link>
          </MenuItem>
        </Menu>
      </li>
    </ul>
  );

  const guestBarLinks = (
    <ul className="navbar-links">
      <li className="navbar-link">
        <SignupButton />
      </li>
      <li className="navbar-link">
        <AuthNav />
      </li>
    </ul>
  );

  if (isLoading) return <LoadingAnimation />;

  return (
    <Fragment>
      <nav className="navbar">
        <Avatar
          className="navbar-logo"
          alt="logo"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX/y+8BWfhbAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
        />
        {isAuthenticated ? authBarLinks : guestBarLinks}
      </nav>
    </Fragment>
  );
};

export default Navbar;
