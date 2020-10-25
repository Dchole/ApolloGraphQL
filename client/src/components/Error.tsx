import React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReplayIcon from "@material-ui/icons/Replay";
import useErrorStyles from "../styles/error-styles";

interface IErrorProps {
  loading: boolean;
  refetch: VoidFunction;
}

const Error: React.FC<IErrorProps> = ({ loading, refetch }) => {
  const classes = useErrorStyles();

  return (
    <Box component="section" display="grid" className={classes.root}>
      <Typography className={classes.message}>
        Oops! Something went wrong!
      </Typography>
      <Button
        variant="contained"
        onClick={refetch}
        disabled={loading}
        endIcon={<ReplayIcon />}
        disableElevation={loading}
        className={classes.button}
      >
        {loading ? <CircularProgress size={25} /> : "Retry"}
      </Button>
    </Box>
  );
};

export default Error;
