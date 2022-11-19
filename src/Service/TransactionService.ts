import { Transactions, Users } from "@prisma/client";
import { number } from "joi";
import * as transactionRepository from "../Repository/TransactionRepository";
import { CreateTransactionType, ITransaction } from "../Types/TransactionType";

//  # Libs

// # Types

export async function getBalanceByUser(userId: number) {
  const user: Users = await getUserbyId(userId);
  return await getBalanceByAccount(user.accountId);
}

export async function createNewTransaction(transactionData: ITransaction) {
  const debitedUser: Users = await getUserbyId(transactionData.userId);
  const debitedAccount = await getBalanceByAccount(debitedUser.accountId);
  await verifyBalanceEnough(
    Number(debitedAccount.balance),
    Number(transactionData.value)
  );

  const creditedUser: Users = await getUserbyUsername(transactionData.username);
  const creditedAccount = await getBalanceByAccount(creditedUser.accountId);

  await verifySameUser(debitedUser.id, creditedUser.id);

  await CreateTransaction({
    debitedAccountId: debitedAccount.id,
    creditedAccountId: creditedAccount.id,
    value: Number(transactionData.value),
  });

  await ChangeBalanceValues(
    debitedAccount,
    creditedAccount,
    Number(transactionData.value)
  );
}

// - Database functions

async function getUserbyId(userId: number) {
  return await transactionRepository.getUser(userId);
}

async function CreateTransaction(transactionData: any) {
  await transactionRepository.createNewTransaction(transactionData);
}

async function getUserbyUsername(username: string) {
  const user = await transactionRepository.getUserByUsername(username ?? "");
  if (!user) throw "esse usuário não existe";
  return user;
}

async function getBalanceByAccount(accountId: number) {
  return await transactionRepository.getBalance(accountId);
}

async function ChangeBalanceValues(
  debitedAccount: any,
  creditedAccount: any,
  value: number
) {
  await transactionRepository.changeValueBalance(
    creditedAccount.id,
    Number(creditedAccount.balance) + value
  );
  await transactionRepository.changeValueBalance(
    debitedAccount.id,
    Number(debitedAccount.balance) - value
  );
}

//  - Aux functions

async function verifyBalanceEnough(balance: number, value: number) {
  if (balance - value < 0) throw "Saldo insuficiente";
}

async function verifySameUser(debitedUserId: number, creditedUserId: number) {
  if (debitedUserId === creditedUserId) throw "Operação indisponível";
}
