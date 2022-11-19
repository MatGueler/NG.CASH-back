import { Router } from "express";
import {
  CreateTransaction,
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
    "/new/transaction",
    validateSchema(transactionSchema),
    CreateTransaction
  );

export default transactionRouter;
