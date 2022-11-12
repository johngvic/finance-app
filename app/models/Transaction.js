const mongoClient = require('../../config/mongoClient');
const { ObjectId } = require('mongodb');

module.exports = class TransactionModel {
  static async fetchTransactions(user, monthInfo) {
    let cursor;
    
    if (monthInfo) {
      cursor = mongoClient
      .db('finance-app')
      .collection('transaction')
      .find({
        user,
        date: {
          $gte: new Date(monthInfo.initialDate)
        }
      })
      .sort({ date: -1 });;
    } else {
      cursor = mongoClient
      .db('finance-app')
      .collection('transaction')
      .find({ user })
      .sort({ date: -1 });
    }

    const transactions = await cursor.toArray();

    return transactions;
  }

  static async fetchTransactionById(transactionId) {
    const transaction = await mongoClient
    .db('finance-app')
    .collection('transaction')
    .findOne({ _id: ObjectId(transactionId) })

    return transaction;
  }

  static async addTransactionPost(transaction) {
    await mongoClient
    .db('finance-app')
    .collection('transaction')
    .insertOne(transaction);
  }

  static async updateTransaction(transactionId, transaction) {
    await mongoClient
    .db('finance-app')
    .collection('transaction')
    .updateOne(
      { _id: ObjectId(transactionId) },
      { $set: transaction }
    );
  }

  static async deleteTransaction(transactionId) {
    await mongoClient
    .db('finance-app')
    .collection('transaction')
    .deleteOne({ _id: ObjectId(transactionId) });
  }
}
