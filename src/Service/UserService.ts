//  # Libs
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IRegister } from "../Types/UserTypes";

export async function registerUser(body: IRegister) {
  // # User should not exist
  await comparePasswords(body);
  const encryptedPassword = encryptPassword(body.password);
  // * Remove property confirmPassword of body
  delete body.confirmPassword;
  await createUser({ ...body, password: encryptedPassword });
}

// - Database functions
async function createUser(body: IRegister) {
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
