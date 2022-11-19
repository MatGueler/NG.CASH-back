import { Transactions } from "@prisma/client";

export interface ITransaction {
  username: string;
  value: number;
  userId?: number;
}

export type CreateTransactionType = Omit<Transactions, "id" | "createdAt">;
