import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import ResponseCheck from "../components/ResponseCheck";
import { useGetUserQuery } from "../generated/graphql";
import LaunchesList from "../components/LaunchesList";
import useProfileStyles from "../styles/profile-styles";

const Profile = () => {
  const classes = useProfileStyles();
  const { data, loading, error } = useGetUserQuery();

  return (
    <Box mt={10}>
      <Container component="section" maxWidth="md">
        {loading ? (
          <Skeleton variant="rect" height={55} />
        ) : (
          <Grid
            container
            component="section"
            justify="center"
            alignItems="center"
          >
            <Avatar variant="rounded" className={classes.avatar}>
              {data?.me.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography
              align="center"
              variant="h3"
              component="h1"
              className={classes.username}
            >
              {data?.me.username}
            </Typography>
          </Grid>
        )}
        <Box component="section" mt={2} mb={10}>
          <Typography variant="h4" component="h2">
            Booked Trips
          </Typography>
          <ResponseCheck loading={loading} error={error} />
          {data && <LaunchesList isBooked={true} onProfilePage={true} />}
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
