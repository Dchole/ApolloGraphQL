import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { loginValidationSchema, loginValues } from "../forms-lib";
import { useSignInMutation } from "../generated/graphql";
import { setAccessToken } from "../token";
import useFormStyles from "../styles/form-styles";
import Feedback from "./Feedback";

interface ILoginProps {
  handleSetAuth: () => void;
}

const Login: React.FC<ILoginProps> = ({ handleSetAuth }) => {
  const classes = useFormStyles();
  const [login, { loading, error }] = useSignInMutation();

  const handleSubmit = async (values: typeof loginValues) => {
    try {
      const { data } = await login({ variables: values });
      data && setAccessToken(data.login);
      handleSetAuth();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Formik
        initialValues={loginValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
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
            component={TextField}
            variant="outlined"
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
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
            {loading ? <CircularProgress size={25} /> : "Sign in"}
          </Button>
        </Form>
      </Formik>
      <Feedback
        severity="error"
        open={Boolean(error)}
        message={error?.message || ""}
      />
    </>
  );
};

export default Login;
