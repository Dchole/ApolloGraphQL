import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "@material-ui/core/Button"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import { useRegisterMutation } from "../generated/graphql"
import { registerValues } from "../lib/form-values"
import { registerValidationSchema } from "../lib/validation-schemas"
import useFormStyles from "../styles/form-styles"
import { handleRegisterSubmit } from "../lib/submit-functions"
import Feedback from "./Feedback"
import useInternalError from "../hooks/useInternalError"

const Register = () => {
  const classes = useFormStyles()
  const [register, { loading, error }] = useRegisterMutation({
    errorPolicy: "all"
  })

  const { internalError, handleClose } = useInternalError(error)

  return (
    <>
      <Formik
        initialValues={registerValues}
        validationSchema={registerValidationSchema}
        onSubmit={(values, actions) =>
          handleRegisterSubmit(values, actions, register)
        }
      >
        {({ errors, touched }) => (
          <Form id="sign-up" name="sign-up">
            <Field
              error={Boolean(errors.username) && touched.username}
              helperText={touched.username && errors.username}
              component={TextField}
              variant="outlined"
              margin="normal"
              id="username"
              name="username"
              label="Username"
              autoFocus
              fullWidth
            />
            <Field
              error={Boolean(errors.email) && touched.email}
              helperText={touched.email && errors.email}
              component={TextField}
              variant="outlined"
              id="email"
              name="email"
              type="email"
              label="Email"
              fullWidth
              className={classes.field}
            />
            <Field
              error={Boolean(errors.password) && touched.password}
              helperText={touched.password && errors.password}
              component={TextField}
              variant="outlined"
              id="new-password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              className={classes.field}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
              disabled={loading}
              disableElevation={loading}
            >
              {loading ? <CircularProgress size={25} /> : "Sign Up"}
            </Button>
          </Form>
        )}
      </Formik>
      <Feedback
        severity="error"
        open={Boolean(internalError)}
        message={internalError}
        handleClose={handleClose}
      />
    </>
  )
}

export default Register
