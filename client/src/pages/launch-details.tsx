import { useParams } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Skeleton from "@material-ui/lab/Skeleton"
import LaunchDetails from "../components/LaunchDetails"
import replacementImg from "../assets/images/badge-2.png"
import useDesktopView from "../hooks/useDesktopView"
import Error from "../components/Error"
import BookTripButton from "../components/LaunchDetails/BookTripButton"
import useDetailStyles from "../styles/detail-styles"
import { useGetLaunchDetailsQuery } from "../generated/graphql"

const LaunchPage = () => {
  const { id } = useParams<{ id: string }>()
  const classes = useDetailStyles()
  const desktopView = useDesktopView()

  const { data, error, refetch, networkStatus } = useGetLaunchDetailsQuery({
    variables: { id },
    notifyOnNetworkStatusChange: true
  })

  if (error) {
    return (
      <Error
        networkStatus={networkStatus}
        refetchVariables={{ id }}
        refetch={refetch}
        error={error}
      />
    )
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid
        container
        direction={desktopView ? "row" : "column-reverse"}
        spacing={desktopView ? 10 : undefined}
      >
        <Grid component="section" xs={12} sm={6} item>
          {data && (
            <LaunchDetails
              name={data.launch.name}
              rocket={data.launch.rocket}
              details={data.launch.details}
              links={data.launch.links}
            />
          )}
          {data && (
            <div className={classes.buttonWrapper}>
              <BookTripButton id={id} isBooked={data.launch.isBooked} />
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {data ? (
            <img
              src={data.launch.patch || replacementImg}
              alt={data.launch.name}
              width={desktopView ? "420" : "200"}
              height={desktopView ? "420" : "200"}
            />
          ) : (
            <Skeleton
              variant="rect"
              height={desktopView ? 420 : 200}
              width={desktopView ? 420 : "100%"}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default LaunchPage
