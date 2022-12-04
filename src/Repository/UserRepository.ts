import { Prisma, Users } from "@prisma/client";
import { UserType } from "../Types/UserTypes";

export async function createUser(prisma: any, body: UserType) {
  await prisma.users.create({ data: body });
}

export async function createAccount(prisma: any, initialBalance: number) {
  return await prisma.accounts.create({ data: { balance: initialBalance } });
}

export async function verifyUsernameAvailability(
  prisma: any,
  username: string
): Promise<Users> {
  return await prisma.users.findFirst({
    where: {
      username,
    },
  });
}
