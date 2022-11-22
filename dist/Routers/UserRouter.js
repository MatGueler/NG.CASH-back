"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var UserController_1 = require("../Controller/UserController");
var ValidateSchemaMiddleware_1 = require("../Middlewares/ValidateSchemaMiddleware");
var LoginSchema_1 = __importDefault(require("../Schemas/LoginSchema"));
var RegisterSchema_1 = __importDefault(require("../Schemas/RegisterSchema"));
var userRouter = (0, express_1.Router)();
userRouter
    .post("/sign-up", (0, ValidateSchemaMiddleware_1.validateSchema)(RegisterSchema_1["default"]), UserController_1.RegisterUser)
    .post("/sign-in", (0, ValidateSchemaMiddleware_1.validateSchema)(LoginSchema_1["default"]), UserController_1.LoginUser);
exports["default"] = userRouter;
