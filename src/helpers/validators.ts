import * as yup from 'yup';

import { MESSAGES } from '@/constants/constantValues';

export const registrationSchema = yup
  .object({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email(MESSAGES.EMAIL_MUST_BE_VALID).required(MESSAGES.EMAIL_REQUIRED),
    password: yup
      .string()
      .required(MESSAGES.PASSWORD_REQUIRED)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{8,99}$/,
        MESSAGES.PASSWORD_INVALID_FORMAT,
      ),
    confirmPassword: yup
      .string()
      .required(MESSAGES.CONFIRM_PASSWORD_REQUIRED)
      .oneOf([yup.ref('password')], MESSAGES.PASSWORDS_MUST_MATCH),
  })
  .required();

export const loginSchema = yup.object({
  email: yup.string().email(MESSAGES.EMAIL_MUST_BE_VALID).required(MESSAGES.EMAIL_REQUIRED),
  password: yup.string().required(MESSAGES.PASSWORD_REQUIRED),
});
