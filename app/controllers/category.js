const CategoryModel = require('../models/Category');

module.exports = class CategoryController {
  static async categoryScreen(req, res, category, errors) {
    if (req.session.user) {
      res.render('add-category', { category, errors })
    } else {
      res.redirect('/');
    }
  }

  static async addCategoryPost(req, res) {
    try {
      const { _id } = req.session.user;
      const category = {
        name: req.body.category,
        user: _id
      }

      await CategoryModel.addCategoryPost(category);

      res.redirect('/home');
    } catch (error) {
      console.error(error);
    }
  }
}