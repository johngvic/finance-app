const UserModel = require('../models/User');

module.exports = class UserController {
  static async userManagement(req, res, authUser, authErrors, addErrors, addUser) {
    res.render('user', { authUser, authErrors, addErrors, addUser });
  }

  static async addUser(req, res) {
    try {
      const user = req.body;
      const newUser = await UserModel.addUser({
        name: user.name,
        email: user.email,
        password: user.password
      });
      
      // console.log(newUser.insertedId.valueOf())

      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.redirect('/');
    }
  }

  static async authUser(req, res) {
    const user = req.body;
    
    try {
      const userAuthenticated = await UserModel.authUser({
        email: user.email,
        password: user.password
      });

      if (!userAuthenticated) {
        throw new Error('User not found');
      }

      req.session.user = { ...userAuthenticated }
      
      res.redirect('/home');
    } catch (error) {
      res.status(500).render('user.ejs', {
        authUser: user,
        authErrors: [{ msg: 'Falha ao autenticar' }],
        addUser: {},
        addErrors: []
      })
    }
  }
}