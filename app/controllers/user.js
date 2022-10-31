const {
  renderUserScreen,
  addUser,
  authUser
} = require('../models/user')
const dbConnection = require('../../config/dbconnection')

module.exports.userScreen = (app, req, res, authUser, authErrors, addErrors, addUser) => {
  const db = dbConnection()

  renderUserScreen(db, (err) => {
    res.render('user', { authUser, authErrors, addErrors, addUser })
  })
}

module.exports.addUser = (app, req, res) => {
  const user = req.body
  const db = dbConnection()
  
  addUser(user, db, (error, result) => {
    res.redirect('/');
  });
};

module.exports.authUser = (app, req, res) => {
  let user = req.body
  const db = dbConnection()

  authUser(user, db, (error, result) => {
    if (result.length > 0) {
      user = result[0]

      req.session.user = {
        id: user.id,
        name: user.name,    
        email: user.email
      }

      res.redirect('/home')
    } else {
      res.status(500).render('user.ejs', {
        authUser: user,
        authErrors: [{ msg: 'Falha ao autenticar' }],
        addUser: {},
        addErrors: []
      })
    }
  })
}