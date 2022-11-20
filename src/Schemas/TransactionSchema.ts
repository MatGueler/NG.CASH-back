import joi from "joi";

const newTransactionSchema = joi.object({
  username: joi.string().min(3).required(),
  value: joi.string().required(),
});

const transactionByDateSchema = joi.object({
  startDate: joi.string().allow(""),
  endDate: joi.string().allow(""),
});

const transactionSchema = {
  newTransactionSchema,
  transactionByDateSchema,
};

export default transactionSchema;
