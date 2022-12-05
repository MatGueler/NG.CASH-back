import joi from "joi";

const newTransactionSchema = joi.object({
  username: joi.string().min(3).required(),
  value: joi.string().required(),
});

const transactionByDateSchema = joi.object({
  startDate: joi.string().allow("").required(),
  endDate: joi.string().allow("").required(),
  credited: joi.boolean().required(),
  debited: joi.boolean().required(),
});

const transactionSchema = {
  newTransactionSchema,
  transactionByDateSchema,
};

export default transactionSchema;
