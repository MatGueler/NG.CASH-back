import { Request, Response } from "express";
import { AuthenticatedRequest } from "../Middlewares/AuthenticationMiddleware";

import * as transactionService from "../Service/TransactionService";
import { ITransaction, ITransactionDate } from "../Types/TransactionType";

export async function GetUserBalance(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const balance = await transactionService.getBalanceByUser(userId);
  res.status(200).send(balance);
}

export async function GetAllTransaction(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;
  const body: ITransactionDate = req.body;
  const transactions = await transactionService.getTransactions({
    ...body,
    userId,
  });
  res.status(200).send(transactions);
}

export async function CreateTransaction(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId }: { userId: number } = req;
  const body: ITransaction = req.body;
  await transactionService.createNewTransaction({ ...body, userId });
  res.sendStatus(201);
}
