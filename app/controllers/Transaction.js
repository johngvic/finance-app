const TransactionModel = require('../models/Transaction');
const CategoryModel = require('../models/Category');

module.exports = class TransactionController {
  static async addTransactionScreen(req, res, transaction, errors) {
    if (req.session.user) {
      const { _id } = req.session.user;
      const categoriesArray = []
      const categories = await CategoryModel.fetchUserCategories(_id);

      categories.forEach((category) => {
        categoriesArray.push({
          id: category._id,
          name: category.name
        })
      })

      res.render('add-transaction', {
        transaction,
        categories: categoriesArray,
        errors
      });
    } else {
      res.redirect('/');
    }
  }

  static async editTransactionScreen(req, res, errors) {
    if (req.session.user) {
      const { _id } = req.session.user;
      const transactionId = req.query.transactionId;
      const dbTransaction = await TransactionModel.fetchTransactionById(transactionId);

      const categoriesArray = [];
      const categories = await CategoryModel.fetchUserCategories(_id);

      const transaction = {
        ...dbTransaction,
        date: new Date(dbTransaction.date).toISOString().split('T')[0],
        value: dbTransaction.value.toString().replace('.', ','),
      }

      categories.forEach((category) => {
        categoriesArray.push({
          id: category._id,
          name: category.name
        })
      })

      res.render('edit-transaction', {
        transaction,
        categories: categoriesArray,
        errors
      })
    } else {
      res.redirect('/');
    }
  }

  static async addTransactionPost(req, res) {
    try {
      const { _id } = req.session.user;
      const transaction = {
        name: req.body.name,
        date: new Date(req.body.date),
        type: req.body.type,
        value: format(req.body.value),
        category: req.body.category,
        user: _id
      }

      await TransactionModel.addTransactionPost(transaction);

      res.redirect('/home');
    } catch (error) {
      console.error(error);
    }
  }

  static async editTransactionPost(req, res) {
    try {
      const transactionId = req.query.transactionId;
      const transaction = {
        name: req.body.name,
        date: new Date(req.body.date),
        type: req.body.type,
        value: format(req.body.value),
        category: req.body.category
      };
  
      await TransactionModel.updateTransaction(transactionId, transaction);

      res.redirect('/history');
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteTransaction(req, res) {
    try {
      const transactionId = req.query.transactionId;

      await TransactionModel.deleteTransaction(transactionId);

      res.redirect('/history');
    } catch (error) {
      console.log(error);
    }
  }
}

const format = (value) => {
  const array = value.split('.')
  let number = ''

  array.forEach(piece => number += piece)

  const final = number.replace(',', '.')

  return parseFloat(final)
}