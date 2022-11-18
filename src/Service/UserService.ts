import * as userRepository from "../Repository/UserRepository";

//  # Libs
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// # Types
import { IRegister, UserType } from "../Types/UserTypes";

export async function registerUser(body: IRegister) {
  await comparePasswords(body);
  await verifyUsernameAvailability(body.username);
  const accountId = await createAccount();
  const encryptedPassword = encryptPassword(body.password);

  delete body.confirmPassword;

  await createUser({ ...body, password: encryptedPassword, accountId });
}

// - Database functions
async function createUser(body: UserType) {
  await userRepository.createUser(body);
}

async function verifyUsernameAvailability(username: string) {
  const user: UserType = await userRepository.verifyUsernameAvailability(
    username
  );

  if (user) {
    throw "username insidponível";
  }
}

async function createAccount() {
  const initialBalance: number = 100;
  const account = await userRepository.createAccount(initialBalance);
  return account.id;
}

// - Aux functions

function encryptPassword(password: string) {
  const SALT = 10;
  const cryptPassword = bcrypt.hashSync(password, SALT);
  return cryptPassword;
}

async function comparePasswords(body: IRegister) {
  if (body.password !== body.confirmPassword) {
    throw "Passwords are differents";
  }
}
