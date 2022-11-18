import * as userRepository from "../Repository/UserRepository";

//  # Libs
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// # Types
import { IRegister, UserType } from "../Types/UserTypes";

export async function registerUser(body: IRegister) {
  await comparePasswords(body);
  await verifyUsernameAvailability(body.username);
  const encryptedPassword = encryptPassword(body.password);
  // * Remove property confirmPassword of body
  delete body.confirmPassword;
  await createUser({ ...body, password: encryptedPassword });
}

// - Database functions
async function createUser(body: IRegister) {
  //   await createUser(body);
}

async function verifyUsernameAvailability(username: string) {
  const user: UserType = await userRepository.verifyUsernameAvailability(
    username
  );

  if (user) {
    throw "username insidponível";
  }
}

async function createAccount(body: IRegister) {
  //   await insertUser(body);
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
