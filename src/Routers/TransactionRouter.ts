import { Router } from "express";
import {
  CreateTransaction,
  GetAllTransaction,
  GetUserBalance,
} from "../Controller/TransactionController";

import { authenticateToken } from "../Middlewares/AuthenticationMiddleware";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";

import transactionSchema from "../Schemas/TransactionSchema";

const transactionRouter = Router();

transactionRouter
  .all("/*", authenticateToken)
  .get("/balance", GetUserBalance)
  .post(
    "/transactions",
    validateSchema(transactionSchema.transactionByDateSchema),
    GetAllTransaction
  )
  .post(
    "/new/transaction",
    validateSchema(transactionSchema.newTransactionSchema),
    CreateTransaction
  );

export default transactionRouter;
