import React, { lazy, Suspense, useEffect, useState } from "react"
import Header from "./Header"
import Navbar from "./Navbar"
import FormWrapper from "../FormWrapper"
import { clearAccessToken, getAccessToken } from "../../token"
import { TSeverity } from "../Banner"

const Banner = lazy(() => import("../Banner"))

const Layout: React.FC = ({ children }) => {
  const [show, setShow] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState<TSeverity>("info")
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessToken())
  )

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const res = await fetch("")

        if (!res.ok) {
          throw new Error()
        }

        setSeverity("success")
        setMessage("Back online")
      } catch (error) {
        setSeverity("error")
        setMessage("No Connection")
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    message && setShow(true)
  }, [message])

  useEffect(() => {
    show && setTimeout(() => setShow(false), 3000)
  }, [show])

  const handleSetAuth = () => setIsAuthenticated(Boolean(getAccessToken()))

  const handleLogout = () => {
    clearAccessToken()
    handleSetAuth()
  }

  const handleEnter = () => setShowPin(false)
  const handleExited = () => setShowPin(true)

  return (
    <>
      <Suspense fallback={<div />}>
        <Banner
          show={show}
          message={message}
          severity={severity}
          handleEnter={handleEnter}
          handleExited={handleExited}
        />
      </Suspense>
      <Header offline={severity === "error" && showPin} logout={handleLogout} />
      {isAuthenticated ? (
        <main>{children}</main>
      ) : (
        <FormWrapper handleSetAuth={handleSetAuth} />
      )}
      <Navbar handleLogout={handleLogout} />
    </>
  )
}

export default Layout
