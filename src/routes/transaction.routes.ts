import { Router } from 'express';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

 const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
     const transactions =  transactionsRepository.all();
     const balance = transactionsRepository.getBalance();
     
     return response.json({transactions, balance});
     
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
  //return response.status(400).json({ message: "teste"});
});

transactionRouter.post('/', (request, response) => {
  try {
    
    const {title, value, type} = request.body;

    const createTransactionRepository = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransactionRepository.execute({title, value, type});

    return response.json(transaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
