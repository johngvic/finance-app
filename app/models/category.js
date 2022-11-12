const mongoClient = require('../../config/mongoClient');
const { ObjectId } = require('mongodb');

module.exports = class CategoryModel {
  static async fetchUserCategories(user) {
    const cursor = mongoClient
    .db('finance-app')
    .collection('category')
    .find({ user });

    const categories = await cursor.toArray()

    return categories;
  }

  static async addCategoryPost(category) {
    await mongoClient
    .db('finance-app')
    .collection('category')
    .insertOne(category);
  }

  static async getCategoryById(category) {
    const response = await mongoClient
    .db('finance-app')
    .collection('category')
    .findOne({ _id: ObjectId(category) });

    return response;
  }
}
