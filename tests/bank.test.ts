import { BankAccount } from '../src/bank';

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = new BankAccount(100);
  });

  test('should initialize with correct balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should deposit money correctly', () => {
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should not deposit negative amount', () => {
    account.deposit(-50);
    expect(account.getBalance()).toBe(100);
  });

  test('should withdraw money correctly', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should not withdraw more than balance', () => {
    account.withdraw(150);
    expect(account.getBalance()).toBe(100);
  });

  test('should not withdraw negative amount', () => {
    account.withdraw(-50);
    expect(account.getBalance()).toBe(100);
  });
});