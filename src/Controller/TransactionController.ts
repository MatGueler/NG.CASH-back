import { Request, Response } from "express";
import { AuthenticatedRequest } from "../Middlewares/AuthenticationMiddleware";

export async function GetUserBalance(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  // const balance = await getBalanceByUser();
  res.sendStatus(200);
}
