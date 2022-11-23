const TransactionModel = require('../models/transaction');
const CategoryModel = require('../models/category');
const { formatCurrency } = require('../utils/formatCurrency');
const { formatDate } = require('../utils/formatDate');

module.exports = class HistoryController {
  static async historyScreen(req, res) {
    if (req.session.user) {
      const { _id } = req.session.user;
      const transactionsArray = [];
      const transactions = await TransactionModel.fetchTransactions(_id);

      for (let index = 0; index < transactions.length; index++) {
        const transaction = transactions[index];
        const category = await CategoryModel.getCategoryById(transaction.category);
        
        transactionsArray.push({
          ...transaction,
          category: category.name,
          type: transaction.type === 'output' ? 'Saída' : 'Entrada',
          value: `R$ ${formatCurrency(parseFloat(transaction.value))}`,
          date: formatDate(new Date(transaction.date).toISOString())
        })
      }

      res.render('history', { transactions: transactionsArray });
    } else {
      res.redirect('/')
    }
  }
}
