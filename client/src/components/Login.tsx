import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { useSignInMutation } from "../generated/graphql";
import { loginValues } from "../lib/form-values";
import { loginValidationSchema } from "../lib/validation-schemas";
import { handleLoginSubmit } from "../lib/submit-functions";
import useFormStyles from "../styles/form-styles";
import Feedback from "./Feedback";

interface ILoginProps {
  handleSetAuth: () => void;
}

const Login: React.FC<ILoginProps> = ({ handleSetAuth }) => {
  const classes = useFormStyles();
  const [login, { loading, error }] = useSignInMutation({ errorPolicy: "all" });
  const [internalError, setInternalError] = useState(false);

  const handleTriggerFeedback = () => setInternalError(true);
  const handleCloseFeedback = () => setInternalError(false);

  useEffect(() => {
    if (error && error.graphQLErrors[0].extensions?.code !== "BAD_USER_INPUT") {
      handleTriggerFeedback();
    }
  }, [error]);

  return (
    <>
      <Formik
        initialValues={loginValues}
        validationSchema={loginValidationSchema}
        onSubmit={(values, actions) =>
          handleLoginSubmit(values, actions, login, handleSetAuth)
        }
      >
        {({ errors }) => (
          <Form>
            <Field
              error={Boolean(errors.email)}
              helperText={errors.email}
              component={TextField}
              variant="outlined"
              margin="normal"
              id="email"
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              fullWidth
            />
            <Field
              error={Boolean(errors.password)}
              helperText={errors.password}
              component={TextField}
              variant="outlined"
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
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
        open={internalError}
        message={"Something went wrong, Please try again!!!"}
        handleClose={handleCloseFeedback}
      />
    </>
  );
};

export default Login;
