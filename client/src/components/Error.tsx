import React, { useState } from "react"
import Box from "@material-ui/core/Box"
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import ReplayIcon from "@material-ui/icons/Replay"
import useErrorStyles from "../styles/error-styles"
import { ApolloError, ApolloQueryResult, NetworkStatus } from "@apollo/client"

interface IValues {
  [key: string]: any
}

interface IErrorProps {
  refetchVariables?: IValues
  refetch: (variables?: IValues) => Promise<ApolloQueryResult<any>>
  networkStatus: NetworkStatus
  error: ApolloError | undefined
}

const Error: React.FC<IErrorProps> = ({
  error,
  refetch,
  refetchVariables,
  networkStatus
}) => {
  const classes = useErrorStyles()
  const [refetching, setRefetching] = useState(false)

  const handleReload = async () => {
    try {
      await refetch(refetchVariables)
    } catch (err) {
      console.error(err.message)
    }
  }

  if (networkStatus === NetworkStatus.refetch) setRefetching(true)

  return (
    <Box mt={20} component="section" display="grid" className={classes.root}>
      <Typography align="center" className={classes.message}>
        {error?.networkError
          ? "Network Error! Please check your connection"
          : "Oops! Something went wrong!"}
      </Typography>
      <Button
        variant="contained"
        onClick={handleReload}
        disabled={refetching}
        endIcon={<ReplayIcon />}
        disableElevation={refetching}
        className={classes.button}
      >
        {refetching ? <CircularProgress size={25} /> : "Retry"}
      </Button>
    </Box>
  )
}

export default Error
