import { Router } from "express";
import { GetUserBalance } from "../Controller/TransactionController";
import { authenticateToken } from "../Middlewares/AuthenticationMiddleware";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";

const transactionRouter = Router();

transactionRouter.all("/*", authenticateToken).get("/balance", GetUserBalance);

export default transactionRouter;
