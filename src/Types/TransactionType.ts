import { Transactions } from "@prisma/client";

export interface ITransaction {
  username: string;
  value: number;
  userId?: number;
}

export type CreateTransactionType = Omit<Transactions, "id" | "createdAt">;

export interface ITransactionDate {
  startDate?: string;
  endDate?: string;
  credited: boolean;
  debited: boolean;
  userId?: number;
}
