"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(initialBalance) {
        this.balance = initialBalance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited: ${amount}. New balance: ${this.balance}`);
        }
        else {
            console.log("Invalid value. Deposit amount should be positive.");
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew: ${amount}. New balance: ${this.balance}`);
        }
        else {
            console.log("Invalid value. Withdraw amount should be positive.");
        }
    }
    getBalance() {
        console.log('Current ballance is: ' + this.balance);
        return this.balance;
    }
}
exports.BankAccount = BankAccount;
//# sourceMappingURL=bank-account.js.map