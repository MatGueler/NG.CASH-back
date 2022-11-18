import { Request, Response } from "express";
import { ILogin, IRegister } from "../Types/UserTypes";

import * as userService from "../Service/UserService";

export async function RegisterUser(req: Request, res: Response) {
  const registerInfos: IRegister = req.body;
  await userService.registerUser(registerInfos);
  res.sendStatus(201);
}

export async function LoginUser(req: Request, res: Response) {
  const loginInfos: ILogin = req.body;
  const token = await userService.loginUser(loginInfos);
  res.status(200).send(token);
}
