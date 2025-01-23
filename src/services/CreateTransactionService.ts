import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if ( type === 'outcome' && value > balance.total ){ 
      throw Error('Value is over income');
    }

    const transaction = this.transactionsRepository.create({
      title: title,
      value: value,
      type: type
    });

    return transaction;
  }
}

export default CreateTransactionService;