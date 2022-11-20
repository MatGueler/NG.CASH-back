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
  .get("/transactions", GetAllTransaction)
  .get("/transactions/cash-in", GetCashInTransaction)
  .get("/transactions/cash-out", GetCashOutTransaction)
  .post(
    "/new/transaction",
    validateSchema(transactionSchema),
    CreateTransaction
  );

export default transactionRouter;
