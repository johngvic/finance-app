const {
  renderAddTransactionScreen,
  addTransaction
} = require('../models/transactions')
const dbConnection = require('../../config/dbconnection')

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
  const transaction = {
    name: req.body.name,
    date: req.body.date,
    type: req.body.type,
    value: format(req.body.value),
    category: req.body.category,
    user: req.session.user.id
  };
  const db = dbConnection();

  addTransaction(transaction, db, (err) => {
    if(!err) res.redirect('/home')
    else console.log(err)
  });
}

const format = (value) => {
  const array = value.split('.')
  let number = ''

  array.forEach(piece => number += piece)

  const final = number.replace(',', '.')

  return parseFloat(final)
}