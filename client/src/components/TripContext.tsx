import { createContext, useCallback, useContext, useState } from "react"

interface ITripContextProps {
  tripBookedOrCancelled: boolean
  handleStateChange: (isBookedOrCancelled: boolean) => void
}

export const TripContext = createContext({} as ITripContextProps)

const TripContextProvider: React.FC = ({ children }) => {
  const [tripBookedOrCancelled, setTripBookedOrCancelled] = useState(false)

  const handleStateChange = useCallback(
    (isBookedOrCancelled: boolean) =>
      setTripBookedOrCancelled(isBookedOrCancelled),
    []
  )

  return (
    <TripContext.Provider value={{ tripBookedOrCancelled, handleStateChange }}>
      {children}
    </TripContext.Provider>
  )
}

export const useTripContext = () => {
  const tripContext = useContext(TripContext)

  if (!tripContext) {
    throw new Error("TripContext() called outside of a Trip Context?")
  }

  return tripContext
}
export default TripContextProvider
