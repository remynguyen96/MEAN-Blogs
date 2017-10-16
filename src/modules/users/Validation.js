import Joi from "joi";

export const PasswordReg = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{5,64}$/;

export default {
  signUp: {
    body: {
      name: Joi.string()
        .required()
        .trim(),
      ipAddress: Joi.string().required(),
      email: Joi.string()
        .email()
        .required()
        .trim(),
      password: Joi.string()
        .regex(PasswordReg)
        .required()
        .trim()
    }
  }
};
