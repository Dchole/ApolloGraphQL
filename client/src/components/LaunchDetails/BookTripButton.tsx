import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import BookIcon from "@material-ui/icons/Book"
import { lazy, useState, Suspense, useEffect } from "react"
import {
  useBookTripMutation,
  useCancelTripMutation
} from "../../generated/graphql"
import useDetailStyles from "../../styles/detail-styles"
import { useTripContext } from "../TripContext"

const Feedback = lazy(() => import("../Feedback"))

interface IBookTripButtonProps {
  id: string
  isBooked: boolean
}

const BookTripButton: React.FC<IBookTripButtonProps> = ({ id, isBooked }) => {
  const classes = useDetailStyles()
  const [booked, setBooked] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [message, setMessage] = useState("")
  const { handleStateChange } = useTripContext()
  const [bookTrip, { loading: bookLoading }] = useBookTripMutation()
  const [cancelTrip, { loading: cancelLoading }] = useCancelTripMutation()

  const mutationLoading = bookLoading || cancelLoading

  const clearMessage = () => setMessage("")

  useEffect(() => {
    setBooked(isBooked)
  }, [isBooked])

  const handleBookTrip = async () => {
    try {
      navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register("BookTrip")
      })

      const { data } = await bookTrip({ variables: { launchId: id } })
      data && setBooked(data.bookTrip.success)
      handleStateChange(true)
      setMessage(`${data?.bookTrip.message}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleCancelTrip = async () => {
    try {
      navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register("CancelTrip")
      })

      const { data } = await cancelTrip({ variables: { launchId: id } })
      data && setCancelled(data.cancelTrip.success)
      handleStateChange(true)
      setMessage(`${data?.cancelTrip.message}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
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
          severity={booked || cancelled ? "success" : "error"}
          message={message}
          open={Boolean(message)}
          handleClose={clearMessage}
        />
      </Suspense>
    </>
  )
}

export default BookTripButton
