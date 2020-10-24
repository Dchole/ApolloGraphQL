import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BookIcon from "@material-ui/icons/Book";
import { RouteComponentProps } from "@reach/router";
import { useGetLaunchDetailsQuery } from "../generated/graphql";
import LaunchDetailsCheck from "../components/LaunchDetailsCheck";
import useDetailStyles from "../styles/detail-styles";

interface ILaunchDetailsProps extends RouteComponentProps {
  id?: string;
}

const LaunchDetails: React.FC<ILaunchDetailsProps> = ({ id }) => {
  const classes = useDetailStyles();

  const { data, loading, error } = useGetLaunchDetailsQuery({
    variables: { id: id! }
  });

  return (
    <Container component="main" maxWidth="md">
      <Box component="section" mt={11}>
        <LaunchDetailsCheck loading={loading} error={error} />
        {data?.launch.mission.missionPatch && (
          <img
            src={data.launch.mission.missionPatch}
            alt={data.launch.mission.name}
          />
        )}
        <Typography variant="h4" component="h1">
          {data?.launch.mission.name}
        </Typography>
        <Typography variant="subtitle1">
          <span role="img" aria-label="">
            🚀
          </span>{" "}
          {data?.launch.rocket.name}({data?.launch.rocket.type})
        </Typography>
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
    </Container>
  );
};

export default LaunchDetails;
