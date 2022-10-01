const { formatCurrency } = require('../utils/formatCurrency')
const { renderHistoryScreen } = require('../models/history')
const dbConnection = require('../../config/dbconnection')

module.exports.historyScreen = (app, req, res) => {
  const db = dbConnection()

  renderHistoryScreen(db, (err, transactions) => {
    const transactionsArray = []

    transactions.forEach(transaction => {
      const date = new Date(transaction.date).toLocaleString('pt').split(' ')[0]
      
      transactionsArray.push({
        ...transaction,
        date,
        type: transaction.type === 'output' ? 'Saída' : 'Entrada',
        value: `R$ ${formatCurrency(parseFloat(transaction.value))}`
      })
    });

    res.render('history', { transactions: transactionsArray })
  })
}