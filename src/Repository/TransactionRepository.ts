import prisma from "../Database/prisma";
import { CreateTransactionType } from "../Types/TransactionType";

// - User infos
export async function getUser(userId: number) {
  return await prisma.users.findFirst({
    where: {
      id: userId,
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

// - All transactions
export async function getAllTransactions(accountId: number) {
  return await prisma.$queryRaw`
  SELECT t.*,u.username as "debitedUser",u2.username as "creditedUser" FROM transactions t
  JOIN users u ON u."accountId"=t."debitedAccountId"
  JOIN users u2 ON u2."accountId"=t."creditedAccountId"
  WHERE (t."creditedAccountId"=${accountId} OR t."debitedAccountId"=${accountId})
  ORDER BY t."createdAt" DESC
  `;
}

export async function getTransactionsByDate(
  startDate: string,
  endDate: string,
  accountId: number
) {
  return await prisma.$queryRaw`
  SELECT t.*,u.username as "debitedUser",u2.username as "creditedUser" FROM transactions t
  JOIN users u ON u."accountId"=t."debitedAccountId"
  JOIN users u2 ON u2."accountId"=t."creditedAccountId"
  WHERE (t."creditedAccountId"=${accountId} OR t."debitedAccountId"=${accountId}) AND (t."createdAt" BETWEEN ${startDate}::timestamp without time zone AND ${endDate}::timestamp without time zone)
  ORDER BY t."createdAt" DESC
  `;
}

// - Cash-in transactions
export async function getCashInTransactionByDate(
  startDate: string,
  endDate: string,
  accountId: number
) {
  return await prisma.$queryRaw`
  SELECT t.*,u.username as "debitedUser",u2.username as "creditedUser" FROM transactions t
  JOIN users u ON u."accountId"=t."debitedAccountId"
  JOIN users u2 ON u2."accountId"=t."creditedAccountId"
  WHERE (t."creditedAccountId"=${accountId}) AND (t."createdAt" BETWEEN ${startDate}::timestamp without time zone AND ${endDate}::timestamp without time zone)
  ORDER BY t."createdAt" DESC
  `;
}

export async function getCashInTransaction(accountId: number) {
  return await prisma.$queryRaw`
  SELECT t.*,u.username as "debitedUser",u2.username as "creditedUser" FROM transactions t
  JOIN users u ON u."accountId"=t."debitedAccountId"
  JOIN users u2 ON u2."accountId"=t."creditedAccountId"
  WHERE (t."creditedAccountId"=${accountId})
  ORDER BY t."createdAt" DESC
  `;
}

// - Cash-out transactions
export async function getCashOutTransaction(accountId: number) {
  return await prisma.$queryRaw`
  SELECT t.*,u.username as "debitedUser",u2.username as "creditedUser" FROM transactions t
  JOIN users u ON u."accountId"=t."debitedAccountId"
  JOIN users u2 ON u2."accountId"=t."creditedAccountId"
  WHERE (t."debitedAccountId"=${accountId})
  ORDER BY t."createdAt" DESC
  `;
}

export async function getCashOutTransactionByDate(
  startDate: string,
  endDate: string,
  accountId: number
) {
  return await prisma.$queryRaw`
  SELECT t.*,u.username as "debitedUser",u2.username as "creditedUser" FROM transactions t
  JOIN users u ON u."accountId"=t."debitedAccountId"
  JOIN users u2 ON u2."accountId"=t."creditedAccountId"
  WHERE (t."debitedAccountId"=${accountId}) AND (t."createdAt" BETWEEN ${startDate}::timestamp without time zone AND ${endDate}::timestamp without time zone)
  ORDER BY t."createdAt" DESC
  `;
}

// - New transaction
export async function createNewTransaction(
  transactionData: CreateTransactionType
) {
  return await prisma.transactions.create({
    data: transactionData,
  });
}

// - Balance values
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
    select: {
      id: true,
      Users: {
        select: {
          username: true,
        },
      },
      balance: true,
    },
  });
}
