export interface IRegister {
  id?: number;
  username: string;
  password: string;
  confirmPassword: string;
}

export type ILogin = Omit<IRegister, "confirmPassword">;
