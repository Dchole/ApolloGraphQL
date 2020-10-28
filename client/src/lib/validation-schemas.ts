import * as Yup from "yup";

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
