import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { ApolloError } from "@apollo/client";
import Error from "./Error";

interface IProfileCheckProps {
  loading: boolean;
  error: ApolloError | undefined;
}

const ProfileCheck: React.FC<IProfileCheckProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <>
        <Skeleton />
        <Typography variant="h3" component="h2">
          Booked Trips
        </Typography>
      </>
    );
  }

  if (error) {
    return <Error loading={loading} refetch={() => {}} />;
  }

  return <></>;
};

export default ProfileCheck;
