"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var TransactionController_1 = require("../Controller/TransactionController");
var AuthenticationMiddleware_1 = require("../Middlewares/AuthenticationMiddleware");
var ValidateSchemaMiddleware_1 = require("../Middlewares/ValidateSchemaMiddleware");
var TransactionSchema_1 = __importDefault(require("../Schemas/TransactionSchema"));
var transactionRouter = (0, express_1.Router)();
transactionRouter
    .all("/*", AuthenticationMiddleware_1.authenticateToken)
    .get("/balance", TransactionController_1.GetUserBalance)
    .post("/transactions", (0, ValidateSchemaMiddleware_1.validateSchema)(TransactionSchema_1["default"].transactionByDateSchema), TransactionController_1.GetAllTransaction)
    .post("/new/transaction", (0, ValidateSchemaMiddleware_1.validateSchema)(TransactionSchema_1["default"].newTransactionSchema), TransactionController_1.CreateTransaction);
exports["default"] = transactionRouter;
