"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loginUser = exports.registerUser = void 0;
var userRepository = __importStar(require("../Repository/UserRepository"));
//  # Libs
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registerUser(body) {
    return __awaiter(this, void 0, void 0, function () {
        var accountId, encryptedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, comparePasswords(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, verifyUsernameAvailability(body.username)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, createAccount()];
                case 3:
                    accountId = _a.sent();
                    encryptedPassword = encryptPassword(body.password);
                    delete body.confirmPassword;
                    return [4 /*yield*/, createUser(__assign(__assign({}, body), { password: encryptedPassword, accountId: accountId }))];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.registerUser = registerUser;
function loginUser(body) {
    return __awaiter(this, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, verifyUserNameExist(body.username)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, compareEncryptedPassword(body.password, user.password)];
                case 2:
                    _a.sent();
                    token = generateToken(user.id);
                    return [2 /*return*/, token];
            }
        });
    });
}
exports.loginUser = loginUser;
// - Database functions
function createUser(body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.createUser(body)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function verifyUserNameExist(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.verifyUsernameAvailability(username)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw "Dados inválidos";
                    }
                    return [2 /*return*/, user];
            }
        });
    });
}
function verifyUsernameAvailability(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.verifyUsernameAvailability(username)];
                case 1:
                    user = _a.sent();
                    if (user) {
                        throw "username insidponível";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function createAccount() {
    return __awaiter(this, void 0, void 0, function () {
        var initialBalance, account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initialBalance = 100;
                    return [4 /*yield*/, userRepository.createAccount(initialBalance)];
                case 1:
                    account = _a.sent();
                    return [2 /*return*/, account.id];
            }
        });
    });
}
// - Aux functions
function encryptPassword(password) {
    var cryptPassword = bcrypt_1["default"].hashSync(password, Number(process.env.BCRYPT_SALT));
    return cryptPassword;
}
function generateToken(userId) {
    var JWT_SECRET = process.env.JWT_SECRET;
    var TIME_JWT = process.env.TIME_JWT;
    var token = jsonwebtoken_1["default"].sign({
        userId: userId
    }, JWT_SECRET, { expiresIn: TIME_JWT });
    return token;
}
function compareEncryptedPassword(password, encryptedPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var verifyPassword;
        return __generator(this, function (_a) {
            verifyPassword = bcrypt_1["default"].compareSync(password, encryptedPassword);
            if (!verifyPassword) {
                throw "User or password are incorrect";
            }
            return [2 /*return*/];
        });
    });
}
function comparePasswords(body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (body.password !== body.confirmPassword) {
                throw "Passwords are differents";
            }
            return [2 /*return*/];
        });
    });
}
