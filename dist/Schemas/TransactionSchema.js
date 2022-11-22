"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var newTransactionSchema = joi_1["default"].object({
    username: joi_1["default"].string().min(3).required(),
    value: joi_1["default"].string().required()
});
var transactionByDateSchema = joi_1["default"].object({
    startDate: joi_1["default"].string().allow("").required(),
    endDate: joi_1["default"].string().allow("").required(),
    credited: joi_1["default"].boolean().required(),
    debited: joi_1["default"].boolean().required()
});
var transactionSchema = {
    newTransactionSchema: newTransactionSchema,
    transactionByDateSchema: transactionByDateSchema
};
exports["default"] = transactionSchema;
