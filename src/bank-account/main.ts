import { BankAccount } from "./bank-account";


const myBankAccount = new BankAccount(100);

myBankAccount.getBalance(); // Current ballance is: 100

myBankAccount.deposit(90); // Deposited: 90. New balance: 190

myBankAccount.withdraw(-60); // Invalid value. Withdraw amount should be positive.

myBankAccount.withdraw(60); // Withdrew: 60. New balance: 130
