import * as userRepository from "../Repository/UserRepository";

//  # Libs
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// # Types
import { ILogin, IRegister, UserType } from "../Types/UserTypes";
import { Users } from "@prisma/client";
import { unauthorizedError, wrongSchemaError } from "../Utils/ErrorUtils";

export async function registerUser(body: IRegister) {
  await comparePasswords(body);
  await verifyUsernameAvailability(body.username);
  const accountId = await createAccount();
  const encryptedPassword = encryptPassword(body.password);

  delete body.confirmPassword;

  await createUser({ ...body, password: encryptedPassword, accountId });
}

export async function loginUser(body: ILogin) {
  const user = await verifyUserNameExist(body.username);
  await compareEncryptedPassword(body.password, user.password);
  const token = generateToken(user.id);
  return token;
}

// - Database functions
async function createUser(body: UserType) {
  await userRepository.createUser(body);
}

async function verifyUserNameExist(username: string) {
  const user: Users = await userRepository.verifyUsernameAvailability(username);

  if (!user) {
    throw wrongSchemaError("Invalid data");
  }
  return user;
}

async function verifyUsernameAvailability(username: string) {
  const user: UserType = await userRepository.verifyUsernameAvailability(
    username
  );

  if (user) {
    throw wrongSchemaError("invalid data");
  }
}

async function createAccount() {
  const initialBalance: number = 100;
  const account = await userRepository.createAccount(initialBalance);
  return account.id;
}

// - Aux functions

function encryptPassword(password: string) {
  const cryptPassword = bcrypt.hashSync(
    password,
    Number(process.env.BCRYPT_SALT)
  );
  return cryptPassword;
}

function generateToken(userId: number): string {
  const JWT_SECRET = process.env.JWT_SECRET;
  const TIME_JWT = process.env.TIME_JWT;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    { expiresIn: TIME_JWT }
  );
  return token;
}

async function compareEncryptedPassword(
  password: string,
  encryptedPassword: string
) {
  const verifyPassword = bcrypt.compareSync(password, encryptedPassword);
  if (!verifyPassword) {
    throw unauthorizedError("User or password are incorrect");
  }
}

async function comparePasswords(body: IRegister) {
  if (body.password !== body.confirmPassword) {
    throw wrongSchemaError("Passwords are differents");
  }
}
