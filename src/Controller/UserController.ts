import { Request, Response } from "express";
import { IRegister } from "../Types/UserTypes";

import * as userService from "../Service/UserService";

export async function RegisterUser(req: Request, res: Response) {
  const registerInfos: IRegister = req.body;
  await userService.registerUser(registerInfos);
  res.sendStatus(201);
}
