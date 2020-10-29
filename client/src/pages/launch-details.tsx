import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BookIcon from "@material-ui/icons/Book";
import {
  useBookTripMutation,
  useGetLaunchDetailsQuery,
  useCancelTripMutation
} from "../generated/graphql";
import useDetailStyles from "../styles/detail-styles";
import Feedback from "../components/Feedback";
import replacementImg from "../assets/images/badge-2.png";
import useDesktopView from "../hooks/useDesktopView";
import Skeleton from "@material-ui/lab/Skeleton";
import Error from "../components/Error";

const LaunchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [message, setMessage] = useState("");
  const classes = useDetailStyles(booked);
  const desktopView = useDesktopView();

  const { data, error, refetch, networkStatus } = useGetLaunchDetailsQuery({
    variables: { id },
    notifyOnNetworkStatusChange: true
  });

  const [bookTrip, { loading: bookLoading }] = useBookTripMutation();
  const [cancelTrip, { loading: cancelLoading }] = useCancelTripMutation();

  const mutationLoading = bookLoading || cancelLoading;

  useEffect(() => {
    data && setBooked(data.launch.isBooked);
  }, [data]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBookTrip = async () => {
    try {
      const { data } = await bookTrip({ variables: { launchId: id } });
      data && setBooked(data.bookTrip.success);
      setCancelled(!data?.bookTrip.success);
      setMessage(`${data?.bookTrip.message}`);
      handleOpen();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelTrip = async () => {
    try {
      const { data } = await cancelTrip({ variables: { launchId: id } });
      data && setCancelled(data.cancelTrip.success);
      setBooked(!data?.cancelTrip.success);
      setMessage(`${data?.cancelTrip.message}`);
      handleOpen();
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return (
      <Error
        networkStatus={networkStatus}
        refetchVariables={{ id }}
        refetch={refetch}
        error={error}
      />
    );
  }

  return (
    <Container component="section" maxWidth="md">
      <Box component="section" mt={11}>
        <Grid container>
          <Grid item xs={12} md={7}>
            {data ? (
              <img
                src={data.launch.mission.missionPatch || replacementImg}
                alt={data.launch.mission.name}
                className={classes.img}
              />
            ) : (
              <Skeleton
                variant="rect"
                height={desktopView ? 420 : 200}
                width={desktopView ? 420 : "100%"}
              />
            )}
          </Grid>
          <Grid
            direction="column"
            alignItems="stretch"
            justify="space-evenly"
            xs={12}
            md={4}
            item
            container
          >
            <div>
              <Typography
                component="h1"
                variant="h4"
                align={desktopView ? "right" : "left"}
              >
                {data ? data.launch.mission.name : <Skeleton />}
              </Typography>
              <Typography
                variant="subtitle1"
                align={desktopView ? "right" : "left"}
              >
                {data ? (
                  <>
                    <span role="img" aria-label="rocket emoji">
                      🚀
                    </span>{" "}
                    {data.launch.rocket.name}({data.launch.rocket.type})
                  </>
                ) : (
                  <Skeleton />
                )}
              </Typography>
            </div>
            {data ? (
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  endIcon={booked ? undefined : <BookIcon />}
                  className={classes.button}
                  onClick={booked ? handleCancelTrip : handleBookTrip}
                  disabled={mutationLoading}
                  disableElevation={mutationLoading}
                >
                  {mutationLoading ? (
                    <CircularProgress size={25} />
                  ) : booked ? (
                    "Cancel Trip"
                  ) : (
                    "Book Trip"
                  )}
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                color="primary"
                endIcon={<BookIcon />}
                className={classes.button}
              >
                Book Trip
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <Feedback
        severity={booked || cancelled ? "success" : "error"}
        message={message}
        open={open}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default LaunchDetails;
