export class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited: ${amount}. New balance: ${this.balance}`);
    } else {
      console.log("Invalid value. Deposit amount should be positive.");
    }
  }

  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew: ${amount}. New balance: ${this.balance}`);
    } else {
      console.log("Invalid value. Withdraw amount should be positive.");
    }
  }

  getBalance(): number {
    console.log('Current ballance is: ' + this.balance);
    return this.balance;
  }
}




const myBankAccount = new BankAccount(100);

myBankAccount.getBalance(); // Current ballance is: 100

myBankAccount.deposit(90); // Deposited: 90. New balance: 190

myBankAccount.withdraw(-60); // Invalid value. Withdraw amount should be positive.

myBankAccount.withdraw(60); // Withdrew: 60. New balance: 130
