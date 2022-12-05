import { Router } from "express";
import transactionRouter from "./TransactionRouter";
import userRouter from "./UserRouter";

const routes = Router();

routes.use(userRouter);
routes.use(transactionRouter);

export default routes;
