import { NextFunction, Request, Response } from "express";
import { AppError } from "../Types/ErrorTypes";
import { errorTypeToStatusCode, isAppError } from "../Utils/ErrorUtils";

export function errorHandlerMiddleware(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }

  return res.sendStatus(500);
}
