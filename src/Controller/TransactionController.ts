import { Request, Response } from "express";
import { AuthenticatedRequest } from "../Middlewares/AuthenticationMiddleware";

import * as transactionService from "../Service/TransactionService";

export async function GetUserBalance(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const balance = await transactionService.getBalanceByUser(userId);
  res.status(200).send(balance);
}
