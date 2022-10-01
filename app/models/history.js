module.exports = {
  renderHistoryScreen: (dbConnection, callback) => {
    const command = 
    `SELECT t.name, date, type, c.name AS category, value
    FROM tb_transaction t, tb_category c
    WHERE t.category = c.id AND t.user = 1
    ORDER BY (date) ASC`

    dbConnection.query(command, callback)
  },
}