module.exports = {
  renderHistoryScreen: (dbConnection, userId, callback) => {
    const command = 
    `SELECT t.id AS id, t.name, date, type, c.name AS category, value
    FROM tb_transaction t, tb_category c
    WHERE t.category = c.id AND t.user = ${userId}
    ORDER BY (date) ASC`

    dbConnection.query(command, callback)
  },
}