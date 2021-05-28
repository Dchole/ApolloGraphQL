import React, { useState } from "react"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import useFormWrapperStyles from "../styles/form-wrapper-styles"
import Login from "./Login"
import Register from "./Register"

interface IFormWrapperProps {
  handleSetAuth: () => void
}

const FormWrapper: React.FC<IFormWrapperProps> = ({ handleSetAuth }) => {
  const classes = useFormWrapperStyles()
  const [login, setLogin] = useState(true)

  const handleChangeFace = () => setLogin(!login)

  return (
    <Container component="section" maxWidth="xs" className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          {login ? "Sign In" : "Sign Up"}
        </Typography>
        {login ? <Login handleSetAuth={handleSetAuth} /> : <Register />}
        <Grid container justify="flex-end" className={classes.link}>
          <Link href="#" onClick={handleChangeFace}>
            {login
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </Link>
        </Grid>
      </Paper>
    </Container>
  )
}

export default FormWrapper
