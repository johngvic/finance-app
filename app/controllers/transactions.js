const {
  renderAddTransactionScreen,
  addTransaction,
  editTransactionScreen,
  editTransaction,
  deleteTransaction
} = require('../models/transactions')
const dbConnection = require('../../config/dbconnection');

module.exports.addTransactionScreen = (app, req, res, transaction, errors) => {
  if(req.session.user) {
    const db = dbConnection()
    const userId = req.session.user.id;

    renderAddTransactionScreen(db, userId, (err, categories) => {
      const categoriesArray = []
      categories.forEach(category => categoriesArray.push({ ...category }));
      
      res.render('add-transaction', { transaction, categories: categoriesArray, errors })
    })
  } else {
    res.redirect('/')
  }
}

module.exports.addTransactionPost = (app, req, res) => {
  const db = dbConnection();
  const transaction = {
    name: req.body.name,
    date: req.body.date,
    type: req.body.type,
    value: format(req.body.value),
    category: req.body.category,
    user: req.session.user.id
  };

  addTransaction(transaction, db, (err) => {
    if(!err) res.redirect('/home')
    else console.log(err)
  });
}

module.exports.editTransactionScreen = (app, req, res, transaction, errors) => {
  if(req.session.user) {
    const db = dbConnection();
    const transactionId = req.query.transactionId;
    const userId = req.session.user.id;

    editTransactionScreen(transactionId, userId, db, (err, result) => {
      const dbTransaction = {
        ...result[1][0],
        date: new Date(result[1][0].date).toISOString().split('T')[0],
        value: result[1][0].value.toString().replace('.', ','),
        transactionId
      };
      const categories = []
      result[0].forEach(category => categories.push({ ...category }));

      res.render('edit-transaction', {
        transaction: dbTransaction,
        categories,
        errors
      })
    })
  } else {
    res.redirect('/')
  }
}

module.exports.editTransactionPost = (app, req, res) => {
  const db = dbConnection();
  const userId = req.session.user.id;
  const transactionId = req.query.transactionId;
  const transaction = {
    name: req.body.name,
    date: req.body.date,
    type: req.body.type,
    value: format(req.body.value),
    category: req.body.category,
    user: userId
  };

  editTransaction(transaction, transactionId, userId, db, (err) => {
    if(!err) res.redirect('/home')
    else console.log(err)
  });
}

module.exports.deleteTransactionPost = (app, req, res) => {
  const db = dbConnection();
  const transactionId = req.query.transactionId;
  const userId = req.session.user.id;

  deleteTransaction(transactionId, userId, db, (err) => {
    if(!err) res.redirect('/history')
    else console.log(err)
  })
}

const format = (value) => {
  const array = value.split('.')
  let number = ''

  array.forEach(piece => number += piece)

  const final = number.replace(',', '.')

  return parseFloat(final)
}