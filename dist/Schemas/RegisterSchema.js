"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
var complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1
};
var registerSchema = joi_1["default"].object({
    username: joi_1["default"].string().min(3).required(),
    password: (0, joi_password_complexity_1["default"])(complexityOptions),
    confirmPassword: (0, joi_password_complexity_1["default"])(complexityOptions)
});
exports["default"] = registerSchema;
