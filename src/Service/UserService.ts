import * as userRepository from "../Repository/UserRepository";

//  # Libs
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// # Types
import { ILogin, IRegister, UserType } from "../Types/UserTypes";
import { Prisma, Users } from "@prisma/client";
import { unauthorizedError, wrongSchemaError } from "../Utils/ErrorUtils";
import prisma from "../Database/prisma";

export async function registerUser(body: IRegister) {
  try {
    await prisma.$transaction(async (db) => {
      const accountId = await createAccount(db);
      await comparePasswords(body);
      await verifyUsernameAvailability(db, body.username);
      const encryptedPassword = encryptPassword(body.password);

      delete body.confirmPassword;

      await createUser(db, { ...body, password: encryptedPassword, accountId });
    });
  } catch (error) {
    console.log(error);
    throw 500;
  }
}

export async function loginUser(body: ILogin) {
  try {
    await prisma.$transaction(async (db) => {
      const user = await verifyUserNameExist(db, body.username);
      await compareEncryptedPassword(body.password, user.password);
      const token = generateToken(user.id);
      return token;
    });
  } catch (error) {
    console.log(error);
    throw 500;
  }
}

// - Database functions
async function createUser(db: any, body: UserType) {
  await userRepository.createUser(db, body);
}

async function verifyUserNameExist(db: any, username: string) {
  const user: Users = await userRepository.verifyUsernameAvailability(
    db,
    username
  );

  if (!user) {
    throw wrongSchemaError("Invalid data");
  }
  return user;
}

async function verifyUsernameAvailability(db: any, username: string) {
  const user: UserType = await userRepository.verifyUsernameAvailability(
    db,
    username
  );

  if (user) {
    throw wrongSchemaError("invalid data");
  }
}

async function createAccount(db: any) {
  const initialBalance: number = 100;
  const account = await userRepository.createAccount(db, initialBalance);
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
