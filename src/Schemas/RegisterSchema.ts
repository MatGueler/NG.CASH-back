import joi from "joi";

import passwordComplexity from "joi-password-complexity";

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
};

const registerSchema = joi.object({
  username: joi.string().min(3).required(),
  password: passwordComplexity(complexityOptions),
  confirmPassword: passwordComplexity(complexityOptions),
});

export default registerSchema;
