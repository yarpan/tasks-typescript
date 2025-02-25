
enum Currency {
  USD = "USD",
  EUR = "EUR",
  UAH = "UAH"
}

type TransactionType = "deposit" | "withdraw";

interface IBankAccount {
  readonly accountNumber: string;
  readonly balance: number;
  readonly currency: Currency;
  owner: Client;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

interface ICommand {
  execute(): void;
  undo(): void;
}



class BankAccount implements IBankAccount {
  private _balance: number;
  private _owner: Client;
  public readonly accountNumber = this.generateAccountNumber();
  public readonly currency: Currency;

  public get balance(): number {
    return this._balance;
  }

  public get owner(): Client {
    return this._owner;
  }

  public set owner(value: Client) {
    this._owner = value;
  }

  constructor(owner: Client, balance: number, currency: Currency) {
    this._balance = balance;
    this._owner = owner;
    this.currency = currency;
  }

  public deposit(amount: number): void {
    this._balance += amount;
    console.info(`Deposit: ${amount} ${this.currency}. New balance: ${this.balance} ${this.currency}`);
  }

  public withdraw(amount: number): void {
    if (amount > this._balance) {
      console.error(`Недостатньо коштів: ${this.balance} ${this.currency}`);
      return;
    }
    this._balance -= amount;
    console.info(`Withdraw: ${amount} ${this.currency}. New balance: ${this.balance} ${this.currency}`);
  }

  private generateAccountNumber(): string {
    return `ACC-${Math.floor(Math.random() * 10000)}`;
  }
}



class Client {
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly id: string;

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public get clientId(): string {
    return this.id;
  }

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = `CLIENT-${Math.floor(Math.random() * 10000)}`;
  }
}



class ClientAccountService {
  private readonly accounts = new Map<string, IBankAccount>();

  public addAccount(account: IBankAccount): void {
    this.accounts.set(account.accountNumber, account);
  }

  public getAccounts(): IBankAccount[] {
    return Array.from(this.accounts.values());
  }

  public getAccountByNumber(accountNumber: string): IBankAccount | undefined {
    return this.accounts.get(accountNumber);
  }

  public closeAccount(accountNumber: string): void {
    this.accounts.delete(accountNumber);
  }
}



class DepositCommand implements ICommand {
  constructor(private account: IBankAccount, private amount: number) { }

  execute(): void {
    this.account.deposit(this.amount);
  }

  undo(): void {
    this.account.withdraw(this.amount);
  }
}



class WithdrawCommand implements ICommand {
  constructor(private account: IBankAccount, private amount: number) { }

  execute(): void {
    this.account.withdraw(this.amount);
  }

  undo(): void {
    this.account.deposit(this.amount);
  }
}



class TransactionQueue {
  private readonly history: ICommand[] = [];
  private readonly undone: ICommand[] = [];

  public execute(command: ICommand): void {
    command.execute();
    this.history.push(command);
    this.undone.length = 0;
  }

  public undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.undone.push(command);
    }
  }

  public redo(): void {
    const command = this.undone.pop();
    if (command) {
      command.execute();
      this.history.push(command);
    }
  }
}



class BankAccountFactory {
  public static createAccount(owner: Client, balance: number, currency: Currency): IBankAccount {
    return new BankAccount(owner, balance, currency);
  }
}



class BankAccountService {
  private accountFactory: typeof BankAccountFactory;

  constructor(factory: typeof BankAccountFactory) {
    this.accountFactory = factory;
  }

  public createAccount(owner: Client, balance: number, currency: Currency): IBankAccount {
    return this.accountFactory.createAccount(owner, balance, currency);
  }
}



class Bank {
  private static instance: Bank;
  private clientService: ClientService;
  private accountService: BankAccountService;
  private transactionQueue: TransactionQueue;
  private clientAccounts = new Map<string, ClientAccountService>();

  private constructor() {
    this.clientService = new ClientService();
    this.accountService = new BankAccountService(BankAccountFactory);
    this.transactionQueue = new TransactionQueue();
  }

  public static getInstance(): Bank {
    if (!Bank.instance) {
      Bank.instance = new Bank();
    }
    return Bank.instance;
  }

  public registerClient(firstName: string, lastName: string): Client {
    const client = this.clientService.registerClient(firstName, lastName);
    this.clientAccounts.set(client.clientId, new ClientAccountService());
    return client;
  }

  public createAccount(client: Client, balance: number, currency: Currency): IBankAccount {
    const account = this.accountService.createAccount(client, balance, currency);
    this.clientAccounts.get(client.clientId)?.addAccount(account);
    return account;
  }

  public getClientAccounts(client: Client): IBankAccount[] {
    return this.clientAccounts.get(client.clientId)?.getAccounts() ?? [];
  }

  public closeAccount(client: Client, accountNumber: string): void {
    this.clientAccounts.get(client.clientId)?.closeAccount(accountNumber);
  }

  public executeTransaction(command: ICommand): void {
    this.transactionQueue.execute(command);
  }

  public undoTransaction(): void {
    this.transactionQueue.undo();
  }

  public redoTransaction(): void {
    this.transactionQueue.redo();
  }
}



class ClientService {
  private clients = new Map<string, Client>();

  public registerClient(firstName: string, lastName: string): Client {
    const client = new Client(firstName, lastName);
    this.clients.set(client.clientId, client);
    return client;
  }

  public getClientById(clientId: string): Client | undefined {
    return this.clients.get(clientId);
  }
}



// ============== USAGE ===============
const bank = Bank.getInstance();

const client = bank.registerClient("Alice", "Johnson");

const usdAccount = bank.createAccount(client, 1200, Currency.USD);
const eurAccount = bank.createAccount(client, 300, Currency.EUR);

console.log(bank.getClientAccounts(client));

const deposit = new DepositCommand(usdAccount, 100);
const withdraw = new WithdrawCommand(eurAccount, 50);

bank.executeTransaction(deposit);
bank.executeTransaction(withdraw);

console.log(bank.getClientAccounts(client));

bank.undoTransaction();
console.log(bank.getClientAccounts(client));

bank.redoTransaction();
console.log(bank.getClientAccounts(client));
