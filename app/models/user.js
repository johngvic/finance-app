const mongoClient = require('../../config/mongoClient');

module.exports = class UserModel {
  static async addUser(user) {
    const newUser = await mongoClient
    .db('finance-app')
    .collection('user')
    .insertOne(user);

    return newUser.insertedId;
  }

  static async authUser(user) {
    const authUser = await mongoClient
    .db('finance-app')
    .collection('user')
    .findOne({
      email: user.email,
      password: user.password
    });

    return authUser;
  }
}
