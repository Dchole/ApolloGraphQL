import { FormikHelpers } from "formik";
import { SignInMutationFn } from "../generated/graphql";
import { setAccessToken } from "../token";
import { TLogin, TRegister } from "./form-values";

export const handleRegisterSubmit = (
  values: TRegister,
  actions: FormikHelpers<TRegister>
) => {
  console.log({ values, actions });
};

export const handleLoginSubmit = async (
  values: TLogin,
  actions: FormikHelpers<TLogin>,
  login: SignInMutationFn,
  handleSetAuth: () => void
) => {
  console.log({ values, actions });
  try {
    const { data, errors } = await login({ variables: values });

    if (data) {
      setAccessToken(data.login);
      handleSetAuth();
    } else if (errors) {
      const formikErrors: Partial<typeof values> = {};

      errors.forEach(error => {
        if (error.extensions?.code === "BAD_USER_INPUT") {
          if (error.extensions.invalidArgs === "email") {
            formikErrors.email = error.message;
          } else {
            formikErrors.password = error.message;
          }
        }
      });

      actions.setErrors(formikErrors);
    }
  } catch (err) {
    console.error(err);
  }
};
