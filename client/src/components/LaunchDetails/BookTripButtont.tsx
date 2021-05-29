import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import BookIcon from "@material-ui/icons/Book"
import { lazy, useState, Suspense } from "react"
import {
  useBookTripMutation,
  useCancelTripMutation
} from "../../generated/graphql"
import useDetailStyles from "../../styles/detail-styles"

const Feedback = lazy(() => import("../Feedback"))

const BookTripButton: React.FC<{ id: string }> = ({ id }) => {
  const classes = useDetailStyles()
  const [booked, setBooked] = useState(false)
  const [message, setMessage] = useState("")
  const [bookTrip, { loading: bookLoading }] = useBookTripMutation()
  const [cancelTrip, { loading: cancelLoading }] = useCancelTripMutation()

  const mutationLoading = bookLoading || cancelLoading

  const clearMessage = () => setMessage("")

  const handleBookTrip = async () => {
    try {
      const { data } = await bookTrip({ variables: { launchId: id } })
      data && setBooked(data.bookTrip.success)
      setMessage(`${data?.bookTrip.message}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleCancelTrip = async () => {
    try {
      const { data } = await cancelTrip({ variables: { launchId: id } })
      setBooked(!data?.cancelTrip.success)
      setMessage(`${data?.cancelTrip.message}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        endIcon={booked ? undefined : <BookIcon />}
        onClick={booked ? handleCancelTrip : handleBookTrip}
        disabled={mutationLoading}
        disableElevation={mutationLoading}
        className={classes.button}
      >
        {mutationLoading ? (
          <CircularProgress size={25} />
        ) : booked ? (
          "Cancel Trip"
        ) : (
          "Book Trip"
        )}
      </Button>
      <Suspense fallback={<div />}>
        <Feedback
          severity={booked ? "success" : "error"}
          message={message}
          open={Boolean(message)}
          handleClose={clearMessage}
        />
      </Suspense>
    </div>
  )
}

export default BookTripButton
