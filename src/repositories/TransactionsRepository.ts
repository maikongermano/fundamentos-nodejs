import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
};

interface CreateTransaction{
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    
    const { income, outcome} = this.transactions.reduce((v: Balance, t: Transaction) => {
      if (t.type === t.type){
        v.income += t.value;
      }
      return v;
    },{
      income: 0,
      outcome: 0,
      total: 0
     },
    );

    const total = income - outcome;

    const balance = {income, outcome, total};

    return balance;

  }

  public create({title, value, type}: CreateTransaction) : Transaction  {
    const transactions = new Transaction({title, value, type});
    this.transactions.push(transactions);
    return transactions;
  }
}

export default TransactionsRepository;
