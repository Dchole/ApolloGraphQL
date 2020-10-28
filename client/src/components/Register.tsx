import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { useRegisterMutation } from "../generated/graphql";
import { registerValues } from "../lib/form-values";
import { registerValidationSchema } from "../lib/validation-schemas";
import useFormStyles from "../styles/form-styles";

const Register = () => {
  const classes = useFormStyles();
  const [register, { loading }] = useRegisterMutation();

  return (
    <Formik
      initialValues={registerValues}
      validationSchema={registerValidationSchema}
      onSubmit={values => {
        register({ variables: values });
      }}
    >
      <Form>
        <Field
          component={TextField}
          variant="outlined"
          margin="normal"
          id="username"
          name="username"
          label="Username"
          autoComplete="nickname"
          fullWidth
        />
        <Field
          component={TextField}
          variant="outlined"
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          fullWidth
          className={classes.field}
        />
        <Field
          component={TextField}
          variant="outlined"
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
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
    </Formik>
  );
};

export default Register;
