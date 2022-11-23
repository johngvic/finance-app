const TransactionModel = require('../models/transaction');
const CategoryModel = require('../models/category');
const { DateTime } = require('luxon');
const { formatCurrency } = require('../utils/formatCurrency');
const { formatDate } = require('../utils/formatDate');

module.exports = class HomeController {
  static async homeScreen(req, res) {
    if (req.session.user) {
      const now = DateTime.now();
      const { _id, name } = req.session.user;
      const firstName = name.split(' ')[0];
      const object = {
        salutation: '',
        balance: formatCurrency(0),
        input: formatCurrency(0),
        output: formatCurrency(0),
        lastTransactions: []
      }
      const monthInfo = {
        initialDate: `${now.year}-${now.month}-01`,
        endDate: `${now.year}-${now.month}-${now.endOf('month').day}`
      }
  
      if (now.hour < 12) {
        object.salutation = `Bom dia, ${firstName}`;
      } else if (now.hour < 18) {
        object.salutation = `Boa tarde, ${firstName}`;
      } else {
        object.salutation = `Boa noite, ${firstName}`;
      }

      const transactions = await TransactionModel.fetchTransactions(_id, monthInfo);

      if (transactions.length > 0) {
        const lastTransactions = [];
        let outputCount = 0;
        let inputCount = 0;

        for (let index = 0; index < transactions.length; index++) {
          const transaction = transactions[index];

          transaction.type === 'input' ?
            inputCount += transaction.value :
            outputCount += transaction.value

          if (lastTransactions.length < 3) {
            const category = await CategoryModel.getCategoryById(transaction.category);

            lastTransactions.push({
              name: transaction.name,
              category: category.name,
              value: `R$ ${formatCurrency(transaction.value)}`,
              date: formatDate(new Date(transaction.date).toISOString())
            });
          }
        }

        object.balance = formatCurrency(inputCount - outputCount);
        object.input = formatCurrency(inputCount);
        object.output = formatCurrency(outputCount);
        object.lastTransactions = lastTransactions;
      }

      res.render('home', { ...object });
    } else {
      res.redirect('/')
    }
  }
}
