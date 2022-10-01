const {
  renderAddCategoryScreen,
  addCategory
} = require('../models/category')
const dbConnection = require('../../config/dbconnection')

module.exports.addCategoryScreen = (app, req, res, category, errors) => {
  const db = dbConnection()

  renderAddCategoryScreen(db, (err) => {
    res.render('add-category', { category, errors })
  })
}

module.exports.addCategoryPost = (app, req, res) => {
  const category = {
    name: req.body.category,
    user: 1
  };
  const db = dbConnection();

  addCategory(category, db, (err, result) => {
    if(!err) res.redirect('/')
    else console.log(err)
  });
}