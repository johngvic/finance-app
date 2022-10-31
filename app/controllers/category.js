const {
  renderAddCategoryScreen,
  addCategory
} = require('../models/category')
const dbConnection = require('../../config/dbconnection')

module.exports.addCategoryScreen = (app, req, res, category, errors) => {
  if (req.session.user) {
    const db = dbConnection()

    renderAddCategoryScreen(db, (err) => {
      res.render('add-category', { category, errors })
    })
  } else {
    res.redirect('/')
  }
}

module.exports.addCategoryPost = (app, req, res) => {
  const category = {
    name: req.body.category,
    user: req.session.user.id
  };
  const db = dbConnection();

  addCategory(category, db, (err, result) => {
    if(!err) res.redirect('/home')
    else console.log(err)
  });
}