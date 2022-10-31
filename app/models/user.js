module.exports = {
  renderUserScreen: (dbConnection, callback) => {
    callback()
  },
  addUser: (user, dbConnection, callback) => {
    const command =
    `INSERT INTO tb_user (name, email, password)
    VALUES ("${user.name}", "${user.email}", MD5("${user.password}"));`

    dbConnection.query(command, callback);
  },
  authUser: (user, dbConnection, callback) => {
    const command =
    `SELECT * FROM tb_user
    WHERE email = "${user.email}" AND password = MD5("${user.password}");`

    dbConnection.query(command, callback)
  }
}