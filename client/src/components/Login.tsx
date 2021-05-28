import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "@material-ui/core/Button"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import { useSignInMutation } from "../generated/graphql"
import { loginValues } from "../lib/form-values"
import { loginValidationSchema } from "../lib/validation-schemas"
import { handleLoginSubmit } from "../lib/submit-functions"
import useFormStyles from "../styles/form-styles"
import Feedback from "./Feedback"
import useInternalError from "../hooks/useInternalError"

interface ILoginProps {
  handleSetAuth: () => void
}

const Login: React.FC<ILoginProps> = ({ handleSetAuth }) => {
  const classes = useFormStyles()
  const [login, { loading, error }] = useSignInMutation({ errorPolicy: "all" })
  const { internalError, handleClose } = useInternalError(error)

  return (
    <>
      <Formik
        initialValues={loginValues}
        validationSchema={loginValidationSchema}
        onSubmit={(values, actions) =>
          handleLoginSubmit(values, actions, login, handleSetAuth)
        }
      >
        {({ errors, touched }) => (
          <Form id="sign-in" name="sign-in">
            <Field
              error={Boolean(errors.email) && touched.email}
              helperText={touched.email && errors.email}
              component={TextField}
              variant="outlined"
              margin="normal"
              id="email"
              name="email"
              type="email"
              label="Email"
              autoFocus
              fullWidth
            />
            <Field
              error={Boolean(errors.password) && touched.password}
              helperText={touched.password && errors.password}
              component={TextField}
              variant="outlined"
              id="current-password"
              name="password"
              type="password"
              label="Password"
              className={classes.field}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
              disableElevation={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={25} /> : "Sign in"}
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

export default Login
