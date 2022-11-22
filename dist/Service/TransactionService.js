"use strict";
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
exports.__esModule = true;
exports.createNewTransaction = exports.getTransactionsByCashOut = exports.getTransactionsByCashIn = exports.getTransactions = exports.getBalanceByUser = void 0;
var transactionRepository = __importStar(require("../Repository/TransactionRepository"));
//  # Libs
// # Types
function getBalanceByUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserbyId(userId)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, getBalanceByAccount(user.accountId)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getBalanceByUser = getBalanceByUser;
function getTransactions(transactionData) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserbyId(transactionData.userId)];
                case 1:
                    user = _a.sent();
                    if (!(transactionData.startDate === "" || transactionData.endDate === "")) return [3 /*break*/, 3];
                    return [4 /*yield*/, filterTypeWithoutDate(transactionData, user)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, transactionRepository.getTransactionsByDate(transactionData.startDate, transactionData.endDate, user.accountId)];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getTransactions = getTransactions;
function filterTypeWithoutDate(transactionData, user) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = true;
                    switch (_a) {
                        case transactionData.debited && transactionData.credited: return [3 /*break*/, 1];
                        case transactionData.debited && !transactionData.credited: return [3 /*break*/, 3];
                        case !transactionData.debited && transactionData.credited: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, transactionRepository.getAllTransactions(user.accountId)];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, transactionRepository.getCashOutTransaction(user.accountId)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, transactionRepository.getCashInTransaction(user.accountId)];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [2 /*return*/, []];
            }
        });
    });
}
function getTransactionsByCashIn(transactionData) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserbyId(transactionData.userId)];
                case 1:
                    user = _a.sent();
                    if (!(transactionData.startDate === "" || transactionData.endDate === "")) return [3 /*break*/, 3];
                    return [4 /*yield*/, transactionRepository.getCashInTransaction(user.accountId)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, transactionRepository.getCashInTransactionByDate(transactionData.startDate, transactionData.endDate, user.accountId)];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getTransactionsByCashIn = getTransactionsByCashIn;
function getTransactionsByCashOut(transactionData) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserbyId(transactionData.userId)];
                case 1:
                    user = _a.sent();
                    if (!(transactionData.startDate === "" || transactionData.endDate === "")) return [3 /*break*/, 3];
                    return [4 /*yield*/, transactionRepository.getCashOutTransaction(user.accountId)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, transactionRepository.getCashOutTransactionByDate(transactionData.startDate, transactionData.endDate, user.accountId)];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getTransactionsByCashOut = getTransactionsByCashOut;
function createNewTransaction(transactionData) {
    return __awaiter(this, void 0, void 0, function () {
        var debitedUser, debitedAccount, creditedUser, creditedAccount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserbyId(transactionData.userId)];
                case 1:
                    debitedUser = _a.sent();
                    return [4 /*yield*/, getBalanceByAccount(debitedUser.accountId)];
                case 2:
                    debitedAccount = _a.sent();
                    return [4 /*yield*/, verifyBalanceEnough(Number(debitedAccount.balance), Number(transactionData.value))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, getUserbyUsername(transactionData.username)];
                case 4:
                    creditedUser = _a.sent();
                    return [4 /*yield*/, getBalanceByAccount(creditedUser.accountId)];
                case 5:
                    creditedAccount = _a.sent();
                    return [4 /*yield*/, verifySameUser(debitedUser.id, creditedUser.id)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, CreateTransaction({
                            debitedAccountId: debitedAccount.id,
                            creditedAccountId: creditedAccount.id,
                            value: Number(transactionData.value)
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, ChangeBalanceValues(debitedAccount, creditedAccount, Number(transactionData.value))];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createNewTransaction = createNewTransaction;
// - Database functions
function getUserbyId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transactionRepository.getUser(userId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function CreateTransaction(transactionData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transactionRepository.createNewTransaction(transactionData)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getUserbyUsername(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transactionRepository.getUserByUsername(username !== null && username !== void 0 ? username : "")];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw "esse usuário não existe";
                    return [2 /*return*/, user];
            }
        });
    });
}
function getBalanceByAccount(accountId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transactionRepository.getBalance(accountId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function ChangeBalanceValues(debitedAccount, creditedAccount, value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transactionRepository.changeValueBalance(creditedAccount.id, Number(creditedAccount.balance) + value)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, transactionRepository.changeValueBalance(debitedAccount.id, Number(debitedAccount.balance) - value)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//  - Aux functions
function verifyBalanceEnough(balance, value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (balance - value < 0)
                throw "Saldo insuficiente";
            return [2 /*return*/];
        });
    });
}
function verifySameUser(debitedUserId, creditedUserId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (debitedUserId === creditedUserId)
                throw "Operação indisponível";
            return [2 /*return*/];
        });
    });
}
