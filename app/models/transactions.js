module.exports = {
  renderAddTransactionScreen: (dbConnection, callback) => {
    const command = `SELECT * FROM tb_category WHERE user = 1`
    dbConnection.query(command, callback);
  },

  addTransaction: (transaction, dbConnection, callback) => {
    const command =
    `INSERT INTO tb_transaction (name, date, type, value, user, category)
    VALUES("${transaction.name}","${transaction.date}","${transaction.type}",${transaction.value},${transaction.user},${transaction.category})`

    dbConnection.query(command, callback);
  }
}