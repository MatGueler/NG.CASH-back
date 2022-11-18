import prisma from "../Database/prisma";
import { UserType } from "../Types/UserTypes";

export async function createUser(body: UserType) {
  await prisma.users.create({ data: body });
}

export async function createAccount(initialBalance: number) {
  return await prisma.accounts.create({ data: { balance: initialBalance } });
}

export async function verifyUsernameAvailability(
  username: string
): Promise<UserType> {
  return await prisma.users.findFirst({
    where: {
      username,
    },
  });
}
