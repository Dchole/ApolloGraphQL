import { FormikHelpers } from "formik";
import { RegisterMutationFn, SignInMutationFn } from "../generated/graphql";
import { setAccessToken } from "../token";
import { TLogin, TRegister } from "./form-values";

export const handleRegisterSubmit = async (
  values: TRegister,
  actions: FormikHelpers<TRegister>,
  register: RegisterMutationFn
) => {
  try {
    const { errors } = await register({ variables: values });

    if (errors) {
      const formikErrors: Partial<typeof values> = {};

      errors.forEach(error => {
        if (error.extensions?.code === "BAD_USER_INPUT") {
          switch (error.extensions.invalidArgs) {
            case "username":
              formikErrors.username = error.message;
              break;
            case "email":
              formikErrors.email = error.message;
              break;
            default:
              formikErrors.password = error.message;
              break;
          }
        }
      });

      actions.setErrors(formikErrors);
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleLoginSubmit = async (
  values: TLogin,
  actions: FormikHelpers<TLogin>,
  login: SignInMutationFn,
  handleSetAuth: () => void
) => {
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
