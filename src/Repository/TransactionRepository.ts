import prisma from "../Database/prisma";
import { CreateTransactionType } from "../Types/TransactionType";

export async function getUser(userId: number) {
  return await prisma.users.findFirst({
    where: {
      id: userId,
    },
  });
}

export async function getAllTransactions(accountId: number) {
  return await prisma.transactions.findMany({
    where: {
      OR: [{ debitedAccountId: accountId }, { creditedAccountId: accountId }],
    },
    select: {
      id: true,
      creditedAccount: {
        select: {
          Users: {
            select: {
              username: true,
            },
          },
        },
      },
      debitedAccount: {
        select: {
          Users: {
            select: {
              username: true,
            },
          },
        },
      },
      value: true,
      createdAt: true,
    },
  });
}

export async function getCashInTransaction(accountId: number) {
  return await prisma.transactions.findMany({
    where: {
      creditedAccountId: accountId,
    },
    select: {
      id: true,
      creditedAccount: {
        select: {
          Users: {
            select: {
              username: true,
            },
          },
        },
      },
      debitedAccount: {
        select: {
          Users: {
            select: {
              username: true,
            },
          },
        },
      },
      value: true,
      createdAt: true,
    },
  });
}

export async function getCashOutTransaction(accountId: number) {
  return await prisma.transactions.findMany({
    where: {
      debitedAccountId: accountId,
    },
    select: {
      id: true,
      creditedAccount: {
        select: {
          Users: {
            select: {
              username: true,
            },
          },
        },
      },
      debitedAccount: {
        select: {
          Users: {
            select: {
              username: true,
            },
          },
        },
      },
      value: true,
      createdAt: true,
    },
  });
}

export async function getUserByUsername(username: string) {
  return await prisma.users.findFirst({
    where: {
      username,
    },
  });
}

export async function createNewTransaction(
  transactionData: CreateTransactionType
) {
  return await prisma.transactions.create({
    data: transactionData,
  });
}

export async function changeValueBalance(accountId: number, balance: number) {
  return await prisma.accounts.upsert({
    where: { id: accountId },
    update: { balance },
    create: { id: accountId, balance },
  });
}

export async function getBalance(accountId: number) {
  return await prisma.accounts.findFirst({
    where: {
      id: accountId,
    },
  });
}
