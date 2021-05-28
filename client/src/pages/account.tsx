import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Avatar from "@material-ui/core/Avatar"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Skeleton from "@material-ui/lab/Skeleton"
import LoadLaunches from "../components/LoadLaunches"
import LaunchesList from "../components/LaunchesList"
import useAccountStyles from "../styles/account-styles"
import { useGetUserQuery } from "../generated/graphql"
import Error from "../components/Error"

const Account = () => {
  const classes = useAccountStyles()
  const { data, loading, error, refetch, networkStatus } = useGetUserQuery({
    notifyOnNetworkStatusChange: true
  })

  if (error) {
    return (
      <Error error={error} refetch={refetch} networkStatus={networkStatus} />
    )
  }

  return (
    <Box mt={10}>
      <Container component="section" maxWidth="md">
        {loading ? (
          <Skeleton animation="wave" variant="rect" height={55} />
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
          <LoadLaunches loading={loading} />
          {data && <LaunchesList isBooked={true} onAccountPage={true} />}
        </Box>
      </Container>
    </Box>
  )
}

export default Account
