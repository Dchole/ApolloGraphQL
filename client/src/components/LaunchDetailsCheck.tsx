import { ApolloError } from "@apollo/client";
import clsx from "clsx";
import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import BookIcon from "@material-ui/icons/Book";
import ReplayIcon from "@material-ui/icons/Replay";
import Skeleton from "@material-ui/lab/Skeleton";
import useDetailStyles from "../styles/detail-styles";

interface ILaunchDetailsCheckProps {
  loading: boolean;
  error: ApolloError | undefined;
}

const LaunchDetailsCheck: React.FC<ILaunchDetailsCheckProps> = ({
  loading,
  error
}) => {
  const classes = useDetailStyles();

  if (loading) {
    return (
      <Box height={300} width="100%" className={classes.header}>
        <Skeleton variant="rect" animation="wave" height="100%" />
        <Skeleton animation="wave" height={75} width="55%" />
        <Skeleton animation="wave" height={40} width="40%" />
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<BookIcon />}
            className={classes.button}
          >
            Book Trip
          </Button>
        </div>
      </Box>
    );
  }

  if (error) {
    return (
      <div className={clsx(classes.buttonWrapper, classes.errorBtnWrapper)}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ReplayIcon />}
          className={classes.button}
        >
          Retry
        </Button>
      </div>
    );
  }

  return <></>;
};

export default LaunchDetailsCheck;
