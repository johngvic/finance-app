module.exports = {
  renderAddTransactionScreen: (dbConnection, userId, callback) => {
    const command = `SELECT * FROM tb_category WHERE user = ${userId}`
    dbConnection.query(command, callback);
  },

  addTransaction: (transaction, dbConnection, callback) => {
    const command =
    `INSERT INTO tb_transaction (name, date, type, value, user, category)
    VALUES("${transaction.name}","${transaction.date}","${transaction.type}",${transaction.value},${transaction.user},${transaction.category})`

    dbConnection.query(command, callback);
  },

  editTransactionScreen: (transactionId, userId, dbConnection, callback) => {
    const command =
    `
    SELECT * FROM tb_category WHERE user = ${userId};
    SELECT * FROM tb_transaction WHERE user = ${userId} AND id = ${transactionId};
    `

    dbConnection.query(command, callback);
  },

  editTransaction: (
    updatedTransaction,
    transactionId,
    userId,
    dbConnection,
    callback
  ) => {
    const command =
    `UPDATE tb_transaction
    SET name = "${updatedTransaction.name}", date = "${updatedTransaction.date}", type = "${updatedTransaction.type}",
    value = ${updatedTransaction.value}, category = ${updatedTransaction.category}
    WHERE id = ${transactionId} AND user = ${userId}
    `;

    dbConnection.query(command, callback);
  },

  deleteTransaction: (transactionId, userId, dbConnection, callback) => {
    const command = `DELETE FROM tb_transaction WHERE id = ${transactionId} AND user = ${userId}`
    dbConnection.query(command, callback)
  }
}