export type AppErrorTypes =
  | "conflict"
  | "not_found"
  | "unauthorized"
  | "wrong_schema";

export interface AppError {
  type: AppErrorTypes;
  message: string;
}
