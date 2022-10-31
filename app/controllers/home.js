const { formatCurrency } = require('../utils/formatCurrency')
const { DateTime } = require('luxon')
const { renderHomeScreen } = require('../models/home')
const dbConnection = require('../../config/dbconnection')

module.exports.home = async (app, req, res) => {
  if (req.session.user) {
    const db = dbConnection()
    const now = DateTime.now()
    const userId = req.session.user.id
    let salutation = ''

    const monthInfo = {
      initialDate: `${now.year}-${now.month}-01`,
      endDate: `${now.year}-${now.month}-${now.endOf('month').day}`
    }

    if (now.hour < 12) {
      salutation = "Bom dia, "
    } else if (now.hour < 18) {
      salutation = "Boa tarde, "
    } else {
      salutation = "Boa noite, "
    }
  
    renderHomeScreen(db, userId, monthInfo, (err, result) => {
      salutation += result[0][0].name.split(' ')[0];
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
        salutation,
        balance: formatCurrency(balance),
        input: formatCurrency(input),
        output: formatCurrency(output),
        lastTransactions
      })
    })
  } else {
    res.redirect('/')
  }
}