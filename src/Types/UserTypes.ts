import { Users } from "@prisma/client";
import { number, string } from "joi";

export interface IRegister {
  id?: number;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ITransaction {
  username: string;
  value: number;
  userId?: number;
}

export type ILogin = Omit<IRegister, "confirmPassword">;

export type UserType = Omit<Users, "id">;
