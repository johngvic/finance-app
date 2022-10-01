module.exports = {
  renderAddCategoryScreen: (dbConnection, callback) => {
    callback()
  },

  addCategory: (category, dbConnection, callback) => {
    const command = `INSERT INTO tb_category (name, user) VALUES("${category.name}", ${category.user})`
    dbConnection.query(command, callback);
  }
}