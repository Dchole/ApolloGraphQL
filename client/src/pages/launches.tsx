import clsx from "clsx";
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import Launch from "../components/Launch";
import ResponseCheck from "../components/ResponseCheck";
import useLaunchesStyles from "../styles/launches-styles";
import { GetLaunchesQuery, useGetLaunchesQuery } from "../generated/graphql";
import { RouteComponentProps } from "@reach/router";

const Launches: React.FC<RouteComponentProps> = () => {
  const classes = useLaunchesStyles();
  const [loadMore, setLoadMore] = useState(false);
  const { data, error, loading, fetchMore, refetch } = useGetLaunchesQuery({
    variables: { pageSize: 5, after: null }
  });

  const handleReload = () => refetch({ pageSize: 5, after: null });

  const handleLoadMore = () => setLoadMore(true);

  const mergeResult = (
    prev: GetLaunchesQuery,
    result: GetLaunchesQuery
  ): GetLaunchesQuery => {
    const mergedLaunches = [
      ...prev.launches.launches,
      ...result.launches.launches
    ];

    const mergedData = { ...prev, ...result };
    mergedData.launches.launches = mergedLaunches;

    return mergedData;
  };

  useEffect(() => {
    if (loadMore) {
      fetchMore({
        variables: { pageSize: 5, after: data?.launches.cursor },
        // @ts-ignore
        updateQuery: (
          prev: GetLaunchesQuery,
          { fetchMoreResult }: { fetchMoreResult: GetLaunchesQuery }
        ) => {
          setLoadMore(false);

          if (!fetchMoreResult) return prev;
          return mergeResult(prev, fetchMoreResult);
        }
      });
    }
  }, [loadMore, data, fetchMore]);

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <ResponseCheck loading={loading} error={error} />
      {data?.launches.launches.map(launch => (
        <Launch
          key={launch.id}
          id={launch.id}
          missionName={launch.mission.name}
          missionPatch={launch.mission.missionPatch}
          rocketName={launch.rocket.name}
        />
      ))}
      <div className={classes.action}>
        <Button
          variant="contained"
          disabled={loadMore}
          disableElevation={loadMore}
          onClick={error ? handleReload : handleLoadMore}
          className={
            loadMore ? clsx(classes.button, classes.loadingBtn) : classes.button
          }
        >
          {loadMore ? (
            <CircularProgress size={30} />
          ) : error ? (
            <ReplayIcon />
          ) : (
            "Load More"
          )}
        </Button>
      </div>
    </Container>
  );
};

export default Launches;
