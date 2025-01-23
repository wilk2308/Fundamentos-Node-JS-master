import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const totalIncome = income.reduce(
      (previousValue, transaction) => previousValue + transaction.value,
      0,
    );

    const totalOutcome = outcome.reduce(
      (previousValue, transaction) => previousValue + transaction.value,
      0,
    );

    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
