const { formatCurrency } = require('../utils/formatCurrency')
const { DateTime } = require('luxon')
const { renderHomeScreen } = require('../models/home')
const dbConnection = require('../../config/dbconnection')

module.exports.home = async (app, req, res) => {
  const db = dbConnection()
  const now = DateTime.now()

  const monthInfo = {
    initialDate: `${now.year}-${now.month}-01`,
    endDate: `${now.year}-${now.month}-${now.endOf('month').day}`
  }

  renderHomeScreen(db, monthInfo, (err, result) => {
    const name = result[0][0].name;
    const totalInput = result[1][0].total_input;
    const totalOutput = result[2][0].total_output;
    const lastTransactions = [];

    result[3].forEach((transaction) => {
      lastTransactions.unshift({ 
        ...transaction,
        value: `R$ ${formatCurrency(transaction.value)}`,
        date: new Date(transaction.date).toLocaleString('pt').split(' ')[0]
      })
    })

    const input = totalInput ? parseFloat(totalInput) : 0;
    const output = totalOutput ? parseFloat(totalOutput) : 0;
    const balance = input - output;

    res.render('home', {
      username: name.split(' ')[0],
      balance: formatCurrency(balance),
      input: formatCurrency(input),
      output: formatCurrency(output),
      lastTransactions
    })
  })
}