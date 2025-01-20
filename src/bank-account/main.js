"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bank_account_1 = require("./bank-account");
const myBankAccount = new bank_account_1.BankAccount(100);
myBankAccount.getBalance();
myBankAccount.deposit(90);
myBankAccount.withdraw(-60);
myBankAccount.withdraw(60);
//# sourceMappingURL=main.js.map