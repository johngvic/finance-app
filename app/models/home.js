module.exports = {
  renderHomeScreen: (dbConnection, userId, monthInfo, callback) => {
    const command = 
    `
      SELECT name FROM tb_user WHERE id = ${userId};

      SELECT SUM(value) AS total_input FROM tb_transaction WHERE type = "input" AND user = ${userId}
      AND date BETWEEN "${monthInfo.initialDate}" AND "${monthInfo.endDate}";

      SELECT SUM(value) AS total_output FROM tb_transaction WHERE type = "output" AND user = ${userId}
      AND date BETWEEN "${monthInfo.initialDate}" AND "${monthInfo.endDate}";
      
      SELECT t.name, c.name AS category, value, date
      FROM tb_transaction t, tb_category c
      WHERE t.category = c.id AND t.user = ${userId}
      AND date BETWEEN "${monthInfo.initialDate}" AND "${monthInfo.endDate}"
      ORDER BY (date) DESC
      LIMIT 0, 3;
    `

    dbConnection.query(command, callback)
  }
}