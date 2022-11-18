import { Router } from "express";
import { GetUserBalance } from "../Controller/TransactionController";
import { authenticateToken } from "../Middlewares/AuthenticationMiddleware";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";

const userRouter = Router();

userRouter.all("/*", authenticateToken).get("/balance", GetUserBalance);

export default userRouter;
