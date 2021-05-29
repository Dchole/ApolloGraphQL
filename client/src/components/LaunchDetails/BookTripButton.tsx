import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import BookIcon from "@material-ui/icons/Book"
import { lazy, useState, Suspense, useEffect } from "react"
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
  const [isBookedLoading, setIsBookedLoading] = useState(true)
  const [bookTrip, { data: bookData, loading: bookLoading }] =
    useBookTripMutation()
  const [cancelTrip, { data: cancelData, loading: cancelLoading }] =
    useCancelTripMutation()

  const mutationLoading = bookLoading || cancelLoading

  const clearMessage = () => setMessage("")

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await fetch("http://localhost:4000", {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGIwZmUzOGE3M2MwOTBjOWIxOTZjNTIiLCJpYXQiOjE2MjIzMDU1MjF9.MfWDH1wSaNnXdfKtBjLSTpg_ElpPpjvAYQ1ecfkShOk",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ query: "{ launch(id: 110) { isBooked } }" })
        }).then(res => res.json())

        setBooked(data)
      } catch (err) {
        console.log(err.message)
      } finally {
        setIsBookedLoading(false)
      }
    })()
  }, [])

  const handleBookTrip = async () => {
    try {
      await bookTrip({ variables: { launchId: id } })
      bookData && setBooked(bookData.bookTrip.success)
      setMessage(`${bookData?.bookTrip.message}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleCancelTrip = async () => {
    try {
      await cancelTrip({ variables: { launchId: id } })
      cancelData && setBooked(cancelData.cancelTrip.success)
      setMessage(`${cancelData?.cancelTrip.message}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      {!isBookedLoading && (
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
      )}
      <Suspense fallback={<div />}>
        <Feedback
          severity={
            bookData?.bookTrip.success || cancelData?.cancelTrip.success
              ? "success"
              : "error"
          }
          message={message}
          open={Boolean(message)}
          handleClose={clearMessage}
        />
      </Suspense>
    </>
  )
}

export default BookTripButton
