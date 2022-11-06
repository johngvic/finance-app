const { check, validationResult } = require('express-validator')
const { home } = require('../controllers/home')
const { historyScreen } = require('../controllers/history');
const {
  addTransactionScreen,
  addTransactionPost,
  editTransactionScreen,
  editTransactionPost,
  deleteTransactionPost
} = require('../controllers/transactions');
const { addCategoryScreen, addCategoryPost } = require('../controllers/category');
const { userScreen, addUser, authUser } = require('../controllers/user')

module.exports = {
  // GET routes
  home: (app) => app.get('/home', (req, res) => {
    home(app, req, res);
  }),

  historyScreen: (app) => app.get('/history', (req, res) => {
    historyScreen(app, req, res);
  }),

  addTransactionScreen: (app) => app.get('/add-transaction', (req, res) => {
    addTransactionScreen(app, req, res, {}, []);
  }),

  addCategoryScreen: (app) => app.get('/add-category', (req, res) => {
    addCategoryScreen(app, req, res, {}, []);
  }),
  
  editTransactionScreen: (app) => app.get('/edit-transaction', (req, res) => {
    editTransactionScreen(app, req, res, undefined, []);
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

        if(validation.isEmpty()) addTransactionPost(app, req, res) 
        else {
          const errors = validation.array();
          addTransactionScreen(app, req, res, transaction, errors)
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

        if(validation.isEmpty()) addCategoryPost(app, req, res) 
        else {
          const errors = validation.array();
          addCategoryScreen(app, req, res, category, errors)
        }
      }
    )
  },

  // USER routes
  userScreen: (app) => app.get('/', (req, res) => {
    userScreen(app, req, res, {}, [], {}, []);
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

        if(validation.isEmpty()) addUser(app, req, res);
        else {
          const addErrors = validation.array();
          userScreen(app, req, res, {}, [], addErrors, user)
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

      if (validation.isEmpty()) authUser(app, req, res);
      else {
        const authErrors = validation.array();
        userScreen(app, req, res, user, authErrors, [], {});
      }
    })
  },

  logout: (app) => {
    app.get('/logout', (req, res) => {
      req.session.destroy();
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

        if(validation.isEmpty()) editTransactionPost(app, req, res) 
        else {
          const errors = validation.array();
          editTransactionScreen(app, req, res, {}, errors)
        }
      }
    )
  },

  // DELETE routes
  deleteTransaction: (app) => app.get('/remove', (req, res) => {
    deleteTransactionPost(app, req, res);
  })
}