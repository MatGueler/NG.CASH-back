import joi from "joi";

import passwordComplexity from "joi-password-complexity";

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
};

const loginSchema = joi.object({
  username: joi.string().min(3).required(),
  password: passwordComplexity(complexityOptions),
});

export default loginSchema;
