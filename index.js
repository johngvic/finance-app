const app = require('./config/server')
const routes = require('./app/routes/routes')

//GET
routes.home(app)
routes.historyScreen(app)
routes.addTransactionScreen(app)
routes.addCategoryScreen(app)

//POST
routes.addTransaction(app)
routes.addCategory(app)