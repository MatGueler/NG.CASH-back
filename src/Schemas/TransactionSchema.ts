import joi from "joi";

const transactionSchema = joi.object({
  username: joi.string().min(3).required(),
  value: joi.string().required(),
});

export default transactionSchema;
