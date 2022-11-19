import { Transactions, Users } from "@prisma/client";
import * as transactionRepository from "../Repository/TransactionRepository";
import { ITransaction } from "../Types/UserTypes";

//  # Libs

// # Types

export async function getBalanceByUser(userId: number) {
  const user: Users = await getUserbyId(userId);
  return await getBalanceByAccount(user.accountId);
}

export async function createNewTransaction(transactionData: ITransaction) {
  const debitedUser: Users = await getUserbyId(transactionData.userId);
  const debitedAccount = await getBalanceByAccount(debitedUser.accountId);
  await verifyBalanceEnough(Number(debitedAccount.balance));

  const creditedUser: Users = await getUserbyUsername(transactionData.username);
  const creditedAccount = await getBalanceByAccount(creditedUser.accountId);

  await CreateTransaction({
    debitedAccountId: debitedAccount.id,
    creditedAccountId: creditedAccount.id,
    value: transactionData.value,
  });
}

// - Database functions

async function getUserbyId(userId: number) {
  return await transactionRepository.getUser(userId);
}

async function CreateTransaction(transactionData: any) {
  return await transactionRepository.createNewTransaction(transactionData);
}

async function getUserbyUsername(username: string) {
  const user = await transactionRepository.getUserByUsername(username);
  if (!user) throw "esse usuário não existe";
  return user;
}

async function getBalanceByAccount(accountId: number) {
  return await transactionRepository.getBalance(accountId);
}

//  - Aux functions

async function verifyBalanceEnough(balance: number) {
  if (balance <= 0) throw "Saldo insuficiente";
}
