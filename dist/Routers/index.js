"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var TransactionRouter_1 = __importDefault(require("./TransactionRouter"));
var UserRouter_1 = __importDefault(require("./UserRouter"));
var routes = (0, express_1.Router)();
routes.use(UserRouter_1["default"]);
routes.use(TransactionRouter_1["default"]);
exports["default"] = routes;
