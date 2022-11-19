import prisma from "../Database/prisma";

export async function getUser(userId: number) {
  return await prisma.users.findFirst({
    where: {
      id: userId,
    },
  });
}

export async function getBalance(accountId: number) {
  return await prisma.accounts.findFirst({
    where: {
      id: accountId,
    },
  });
}
