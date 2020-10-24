import { FormikHelpers } from "formik";
import * as Yup from "yup";

export const registerValues = {
  username: "",
  email: "",
  password: ""
};

export const loginValues = {
  email: "",
  password: ""
};

type TRegister = typeof registerValues;
type TLogin = typeof loginValues;

export const registerValidationSchema = () =>
  Yup.object({
    username: Yup.string().required().min(3).label("Username"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().label("Password")
  });

export const loginValidationSchema = () =>
  Yup.object({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().label("Password")
  });

export const handleSubmitRegisterForm = (
  values: TRegister,
  actions: FormikHelpers<TRegister>
) => {
  console.log({ values, actions });
};

export const handleSubmitLoginForm = (
  values: TLogin,
  actions: FormikHelpers<TLogin>
) => {
  console.log({ values, actions });
};
