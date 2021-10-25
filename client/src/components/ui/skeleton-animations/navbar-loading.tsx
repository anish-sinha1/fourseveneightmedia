import React, { Fragment } from "react";
import Skeleton from "@mui/material/Skeleton";

const LoadingAnimation: React.FC = () => {
  return (
    <Fragment>
      <Skeleton
        className="navbar navbar-skeleton"
        variant="rectangular"
      ></Skeleton>
    </Fragment>
  );
};

export default LoadingAnimation;
