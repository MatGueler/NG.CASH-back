import { Router } from "express";
import {
  CreateTransaction,
  GetAllTransaction,
  GetCashInTransaction,
  GetCashOutTransaction,
  GetUserBalance,
} from "../Controller/TransactionController";

import { authenticateToken } from "../Middlewares/AuthenticationMiddleware";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";

import transactionSchema from "../Schemas/TransactionSchema";

const transactionRouter = Router();

transactionRouter
  .all("/*", authenticateToken)
  .get("/balance", GetUserBalance)
  .get(
    "/transactions",
    validateSchema(transactionSchema.transactionByDateSchema),
    GetAllTransaction
  )
  .get(
    "/transactions/cash-in",
    validateSchema(transactionSchema.transactionByDateSchema),
    GetCashInTransaction
  )
  .get(
    "/transactions/cash-out",
    validateSchema(transactionSchema.transactionByDateSchema),
    GetCashOutTransaction
  )
  .post(
    "/new/transaction",
    validateSchema(transactionSchema),
    CreateTransaction
  );

export default transactionRouter;
