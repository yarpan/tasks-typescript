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


