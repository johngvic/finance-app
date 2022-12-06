const { check, validationResult } = require('express-validator')
const HomeController = require('../controllers/home');
const TransactionController = require('../controllers/transaction');
const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');
const HistoryController = require('../controllers/history');

module.exports = {
  // GET routes
  home: (app) => app.get('/home', (req, res) => {
    HomeController.homeScreen(req, res);
  }),

  historyScreen: (app) => app.get('/history', (req, res) => {
    HistoryController.historyScreen(req, res);
  }),

  addTransactionScreen: (app) => app.get('/add-transaction', (req, res) => {
    TransactionController.addTransactionScreen(req, res, {}, []);
  }),

  addCategoryScreen: (app) => app.get('/add-category', (req, res) => {
    CategoryController.categoryScreen(req, res, {}, []);
  }),
  
  editTransactionScreen: (app) => app.get('/edit-transaction', (req, res) => {
    TransactionController.editTransactionScreen(req, res, []);
  }),

  // POST routes
  addTransaction: (app) => {
    app.post('/add-transaction/create',
      [
        check('name').isLength({ min: 3, max: 100 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
        check('type').notEmpty().withMessage('Selecione um tipo'),
        check('category').notEmpty().withMessage('Selecione uma categoria'),
        check('value').notEmpty().withMessage('Insira o valor da transação'),
        check('date').notEmpty().withMessage('Insira a data da transação')
      ], (req, res) => {
        const validation = validationResult(req);
        const transaction = req.body;

        if(validation.isEmpty()) {
          TransactionController.addTransactionPost(req, res);
        } else {
          const errors = validation.array();
          TransactionController.addTransactionScreen(req, res, transaction, errors);
        }
      }
    )
  },

  addCategory: (app) => {
    app.post('/add-category/create',
      [
        check('category').isLength({ min: 3, max: 100 }).withMessage('Categoria deve ter pelo menos 3 caracteres'),
      ], (req, res) => {
        const validation = validationResult(req);
        const category = req.body;

        if(validation.isEmpty()) {
          CategoryController.addCategoryPost(req, res);
        } else {
          const errors = validation.array();
          CategoryController.categoryScreen(req, res, category, errors);
        }
      }
    )
  },

  // USER routes
  userScreen: (app) => app.get('/', (req, res) => {
    UserController.userManagement(req, res, {}, [], {}, []);
  }),

  saveUser: (app) => {
    app.post('/newUser', [
      check('name').isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres'),
      check('email').isEmail().normalizeEmail().withMessage('Email deve ser válido!'),
      check('password').isLength({ min: 5 }).withMessage('Senha deve ter no mínimo 5 caracteres'),
      check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('As senhas digitadas não são iguais!');
        }
        return true;
      })], (req, res) => {
        const validation = validationResult(req);
        const user = req.body;

        if(validation.isEmpty()) {
          UserController.addUser(req, res);
        } else {
          const addErrors = validation.array();
          UserController.userManagement(req, res, {}, [], addErrors, user);
        }
      })
  },

  authUser: (app) => {
    app.post('/auth', [
      check('email').isEmail().withMessage('Email deve ser válido!'),
      check('password').isLength({ min: 5 }).withMessage('Senha deve ter no mínimo 5 caracteres'),
    ], (req, res) => {
      const validation = validationResult(req);
      const user = req.body;

      if (validation.isEmpty()) {
        UserController.authUser(req, res);
      } else {
        const authErrors = validation.array();
        UserController.userManagement(req, res, user, authErrors, [], {});
      }
    })
  },

  logout: (app) => {
    app.get('/logout', (req, res) => {
      req.session = null;
      res.redirect('/');
    });
  },

  // UPDATE routes
  editTransaction: (app) => {
    app.post('/edit-transaction/edit',
      [
        check('name').isLength({ min: 3, max: 100 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
        check('type').notEmpty().withMessage('Selecione um tipo'),
        check('category').notEmpty().withMessage('Selecione uma categoria'),
        check('value').notEmpty().withMessage('Insira o valor da transação'),
        check('date').notEmpty().withMessage('Insira a data da transação')
      ], (req, res) => {
        const validation = validationResult(req);

        if(validation.isEmpty()) {
          TransactionController.editTransactionPost(req, res);
        } else {
          const errors = validation.array();
          TransactionController.editTransactionScreen(req, res, errors);
        }
      }
    )
  },

  // DELETE routes
  deleteTransaction: (app) => app.get('/remove', (req, res) => {
    TransactionController.deleteTransaction(req, res);
  })
}