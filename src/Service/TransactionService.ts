import { Users } from "@prisma/client";
import * as transactionRepository from "../Repository/TransactionRepository";

//  # Libs

// # Types

export async function getBalanceByUser(userId: number) {
  const user: Users = await getUserbyId(userId);
  return await getBalanceByAccount(user.accountId);
}

// - Database functions

async function getUserbyId(userId: number) {
  return await transactionRepository.getUser(userId);
}

async function getBalanceByAccount(accountId: number) {
  return await transactionRepository.getBalance(accountId);
}
