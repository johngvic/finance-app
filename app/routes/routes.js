const { check, validationResult } = require('express-validator')
const { home } = require('../controllers/home')
const { historyScreen } = require('../controllers/history');
const { addTransactionScreen, addTransactionPost } = require('../controllers/transactions');
const { addCategoryScreen, addCategoryPost } = require('../controllers/category');

module.exports = {
  //GET routes
  home: (app) => app.get('/', (req, res) => {
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

  //POST routes
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
}