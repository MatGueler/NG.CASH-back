import { Users } from "@prisma/client";

export interface IRegister {
  id?: number;
  username: string;
  password: string;
  confirmPassword: string;
}

export type ILogin = Omit<IRegister, "confirmPassword">;

export type UserType = Users;
