const app = require('./config/server');
const routes = require('./app/routes/routes');
require('./startup/prod')(app);

//GET
routes.home(app);
routes.historyScreen(app);
routes.addTransactionScreen(app);
routes.addCategoryScreen(app);
routes.userScreen(app);
routes.logout(app);

//POST
routes.addTransaction(app);
routes.addCategory(app);
routes.saveUser(app);
routes.authUser(app);

//DELETE
routes.deleteTransaction(app)

//UPDATE
routes.editTransactionScreen(app)
routes.editTransaction(app)