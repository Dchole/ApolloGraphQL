import clsx from "clsx"
import React, { useEffect, useState } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Launch from "../components/Launch"
import LoadLaunches from "./LoadLaunches"
import useLaunchesStyles from "../styles/launches-styles"
import { GetLaunchesQuery, useGetLaunchesQuery } from "../generated/graphql"
import useDesktopView from "../hooks/useDesktopView"
import Error from "./Error"
import { useTripContext } from "./TripContext"

interface ILaunchesListProps {
  isBooked?: boolean
  onAccountPage?: boolean
}

const LaunchesList: React.FC<ILaunchesListProps> = ({
  isBooked,
  onAccountPage
}) => {
  const variables = { limit: 5, page: null, isBooked }

  const desktopView = useDesktopView()
  const classes = useLaunchesStyles(desktopView)
  const [loadMore, setLoadMore] = useState(false)
  const [page, setPage] = useState(1)
  const { tripBookedOrCancelled, handleStateChange } = useTripContext()
  const { data, error, loading, fetchMore, refetch, networkStatus } =
    useGetLaunchesQuery({
      variables,
      notifyOnNetworkStatusChange: true,
      fetchPolicy:
        isBooked && tripBookedOrCancelled ? "network-only" : "cache-first"
    })

  const handleLoadMore = () => {
    setLoadMore(true)
    setPage(page + 1)
  }

  const mergeResult = (
    prev: GetLaunchesQuery,
    result: GetLaunchesQuery
  ): GetLaunchesQuery => {
    const mergedLaunches = [
      ...prev.launches.launches,
      ...result.launches.launches
    ]

    const mergedData = { ...prev, ...result }
    mergedData.launches.launches = mergedLaunches

    return mergedData
  }

  useEffect(() => {
    data?.launches.launches && handleStateChange(false)
  }, [data, handleStateChange])

  useEffect(() => {
    if (loadMore) {
      fetchMore({
        variables: { limit: 5, page, isBooked },
        // @ts-ignore
        updateQuery: (
          prev: GetLaunchesQuery,
          { fetchMoreResult }: { fetchMoreResult: GetLaunchesQuery }
        ) => {
          setLoadMore(false)

          if (!fetchMoreResult) return prev
          return mergeResult(prev, fetchMoreResult)
        }
      })
    }
  }, [loadMore, data, fetchMore, isBooked, page])

  if (error)
    return (
      <Error
        error={error}
        refetch={refetch}
        refetchVariables={variables}
        networkStatus={networkStatus}
      />
    )

  return (
    <Container
      component="section"
      maxWidth="md"
      disableGutters={onAccountPage}
      className={onAccountPage ? undefined : classes.root}
    >
      <LoadLaunches loading={loading} />
      {data?.launches.launches.map(launch => (
        <Launch
          key={launch.id}
          id={launch.id}
          missionName={launch.name}
          missionPatch={launch.patch}
          rocketName={launch.rocket.name}
        />
      ))}
      {data?.launches.hasMore && (
        <div className={classes.action}>
          <Button
            variant="contained"
            disabled={loadMore}
            disableElevation={loadMore}
            onClick={handleLoadMore}
            className={
              loadMore
                ? clsx(classes.button, classes.loadingBtn)
                : classes.button
            }
          >
            {loadMore ? <CircularProgress size={30} /> : "Load More"}
          </Button>
        </div>
      )}
    </Container>
  )
}

export default LaunchesList
