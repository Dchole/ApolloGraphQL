import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";

const ProfileCheck = () => {
  return (
    <>
      <Skeleton />
      <Typography variant="h3" component="h2">
        Booked Trips
      </Typography>
    </>
  );
};

export default ProfileCheck;
